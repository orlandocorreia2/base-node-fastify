import { inject, injectable } from 'tsyringe';
import { MultipartFile } from '@fastify/multipart';
import axios from 'axios';
import * as cheerio from 'cheerio';
import playwright from 'playwright';
import { CreateAuctionPropertiesBatchUseCaseInterface } from './interfaces/create.auction.properties.batch.usecase.interface';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { CreateAuctionPropertiesBatchUseCaseExecuteResponseProps } from './types';
import { CreateAuctionPropertyRepositoryProps } from '../repositories/types';
import { sleep } from '../../../utils/util';
import { getDataExtraction } from '../../../utils/csv';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { deleteFile, writeFile } from '../../../utils/file';

@injectable()
export class CreateAuctionPropertiesBatchUseCase
  implements CreateAuctionPropertiesBatchUseCaseInterface
{
  private _allData: CreateAuctionPropertyRepositoryProps[] = [];
  private _totalRows: number;
  private _totalRowsAddedAllData: number;

  constructor(
    @inject('AuctionPropertyRepository')
    private _auctionPropertyRepository: AuctionPropertyRepositoryInterface,
  ) {}

  public async execute(
    createdById: string,
    multipartData?: MultipartFile,
  ): Promise<CreateAuctionPropertiesBatchUseCaseExecuteResponseProps> {
    this._allData = [];
    this._totalRows = 0;
    this._totalRowsAddedAllData = 0;
    await this.saveFileOnDisk(multipartData);
    console.log('Deleted all auction properties...');
    await this._auctionPropertyRepository.deleteAll();
    console.log('Start rows file...');
    await getDataExtraction({
      filePath: './src/temp/auction_properties.csv',
      fn: (data: any) => {
        const {
          _1: uf,
          _2: city,
          _3: neighborhood,
          _4: address,
          _5: price,
          _6: appraisal_value,
          _7: discount,
          _8: description,
          _9: sale_method,
          _10: access_link,
        } = data;
        const number_property = parseInt(data?._0?.replace(/\D/g, ''));
        if (
          number_property &&
          typeof number_property === 'number' &&
          number_property > 0
        ) {
          this._totalRows++;
          this.addAllData({
            created_by_id: createdById,
            number_property,
            uf,
            city,
            neighborhood,
            address,
            price: parseFloat(price),
            appraisal_value: parseFloat(appraisal_value),
            discount: parseFloat(discount),
            description,
            sale_method,
            access_link,
          });
        }
      },
    });
    console.log('Waiting finish add data...');
    await this.finishFillAllData();
    console.log('Finish added data...');
    this._auctionPropertyRepository.createMany(this._allData);
    console.log(
      `Total saved auction properties batch: ${this._totalRowsAddedAllData}`,
    );
    return {
      message: `Total saved auction properties batch: ${this._totalRowsAddedAllData}`,
    };
  }

  private saveFileOnDisk(multipartData?: MultipartFile) {
    return new Promise(async resolve => {
      const fileWritePath = './src/temp/auction_properties.csv';
      deleteFile(fileWritePath);
      if (multipartData) {
        console.log('Send file from body...');
        this.validateMultipartDataForm(multipartData);
        const buffer = await multipartData.toBuffer();
        writeFile(
          fileWritePath,
          buffer,
          () => {
            throw new UnprocessableError(
              'Erro ao salvar o arquivo. Verifique e tente novamente mais tarde.',
            );
          },
          () => {
            resolve(true);
          },
        );
        return;
      }
      try {
        console.log('Start download file...');
        const browser = await playwright.chromium.launch();
        const context = await browser.newContext({
          acceptDownloads: true,
          ignoreHTTPSErrors: true,
        });
        const page = await context.newPage();
        await page.goto(
          'https://venda-imoveis.caixa.gov.br/sistema/download-lista.asp',
        );
        const waitForDownloadEvent = page.waitForEvent('download');
        await page.waitForSelector('#cmb_estado');
        await page.selectOption('#cmb_estado', { value: 'geral' });
        await page.click('#btn_next1');
        const download = await waitForDownloadEvent;
        await download.saveAs(fileWritePath);
        browser.close();
        console.log('Finish download file...');
        resolve(true);
      } catch (error) {
        console.error('Error download file:', error);
        throw new UnprocessableError(
          'Erro ao baixar o arquivo no site da Caixa. Tente novamente mais tarde.',
        );
      }
    });
  }

  private validateMultipartDataForm(multipartData: MultipartFile) {
    if (!multipartData || multipartData.mimetype !== 'text/csv') {
      throw new UnprocessableError(
        'Arquivo com extensão .xlsx não encontrado ou inválido!',
      );
    }
  }

  private async addAllData({
    created_by_id,
    number_property,
    uf,
    city,
    neighborhood,
    address,
    price,
    appraisal_value,
    discount,
    description,
    sale_method,
    access_link,
  }: CreateAuctionPropertyRepositoryProps) {
    let accept_financing = false;
    try {
      const { data } = await axios.get(access_link);
      const $ = cheerio.load(data);
      const p = $('.related-box > p');
      accept_financing =
        $(p[2]).text().indexOf('NÃO aceita financiamento') == -1;
    } catch {
    } finally {
      this._allData.push({
        created_by_id,
        number_property,
        uf,
        city,
        neighborhood,
        address,
        price,
        appraisal_value,
        discount,
        description,
        sale_method,
        access_link,
        accept_financing,
      });
      this._totalRowsAddedAllData++;
    }
  }

  private finishFillAllData() {
    return new Promise(async resolve => {
      await sleep(3);
      while (this._totalRowsAddedAllData < this._totalRows) {
        await sleep(3);
      }
      resolve(true);
    });
  }
}
