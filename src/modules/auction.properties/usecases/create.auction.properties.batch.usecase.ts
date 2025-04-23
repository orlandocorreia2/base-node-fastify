import { inject, injectable } from 'tsyringe';
import { MultipartFile } from '@fastify/multipart';
import playwright from 'playwright';
import { CreateAuctionPropertiesBatchUseCaseInterface } from './interfaces/create.auction.properties.batch.usecase.interface';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { CreateAuctionPropertiesBatchUseCaseExecuteResponseProps } from './types';
import { CreateAuctionPropertyRepositoryProps } from '../repositories/types';
import { sleep } from '../../../utils/util';
import { getDataExtraction } from '../../../utils/csv';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { writeFile } from '../../../utils/file';
import { convertInteger } from '../../../utils/number';
import axios from 'axios';
import * as cheerio from 'cheerio';

axios.defaults.timeout = 3000;

@injectable()
export class CreateAuctionPropertiesBatchUseCase
  implements CreateAuctionPropertiesBatchUseCaseInterface
{
  private _allData: CreateAuctionPropertyRepositoryProps[] = [];
  private _totalRows: number;
  private _totalRowsAddedAllData: number;

  constructor(
    @inject('AuctionPropertyRepository')
    private readonly _auctionPropertyRepository: AuctionPropertyRepositoryInterface,
  ) {}

  public async execute(
    createdById: string,
    multipartData?: MultipartFile,
  ): Promise<CreateAuctionPropertiesBatchUseCaseExecuteResponseProps> {
    this._allData = [];
    this._totalRows = 0;
    this._totalRowsAddedAllData = 0;
    await this.saveFileOnDisk(multipartData);

    console.log('Start rows file...');
    await getDataExtraction({
      filePath: './src/temp/auction_properties.csv',
      fn: async (data: any) => {
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
          const property_type = description.split(',')[0];
          this.addAllData({
            created_by_id: createdById,
            number_property,
            uf,
            city,
            neighborhood,
            address,
            price: convertInteger(price),
            appraisal_value: convertInteger(appraisal_value),
            discount: convertInteger(discount),
            property_type: property_type ?? 'N/A',
            description: description.split(',')[1],
            sale_method,
            access_link,
          });
        }
      },
    });
    console.log('Waiting finish add data...');
    await this.finishFillAllData();
    console.log('Finish added data...');
    await this.setDetailsPage();
    console.log('Finish set details page...');
    console.log('Deleted all auction properties...');
    await this._auctionPropertyRepository.deleteAll();
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
        const browser = await playwright.chromium.launch({ headless: true });
        const context = await browser.newContext({
          ...playwright.devices['Desktop Chrome'],
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
    property_type,
    description,
    sale_method,
    access_link,
  }: CreateAuctionPropertyRepositoryProps) {
    let accept_financing = false;
    let registration_property_link = '';
    let photo_link = '';
    try {
      // const browser = await playwright.chromium.launch({ headless: true });
      // const context = await browser.newContext({
      //   acceptDownloads: true,
      //   ignoreHTTPSErrors: true,
      // });
      // const page = await context.newPage();
      // await page.goto(access_link);
      // const photo_link_src = await page.locator('#preview').getAttribute('src');
      // browser.close();
      // const baseLinkCaixa = 'https://venda-imoveis.caixa.gov.br';
      // photo_link = photo_link_src ? `${baseLinkCaixa}${photo_link_src}` : '';
      // const p = $('.related-box > p');
      // accept_financing =
      //   p && p.length >= 3
      //     ? $(p[2]).text().indexOf('NÃO aceita financiamento') == -1
      //     : false;
      // const a = $('.related-box > span > a');
      // const aOnClick = $(a).attr('onclick');
      // registration_property_link = aOnClick
      //   ? `${baseLinkCaixa}${aOnClick?.split("('")[1].replace("')", '')}`
      //   : '';
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
        property_type,
        description,
        sale_method,
        access_link,
        accept_financing,
        photo_link,
        registration_property_link,
      });
      this._totalRowsAddedAllData++;
    }
  }

  private async setDetailsPage() {
    // let indexData = 0;
    console.log('Start setDetailsPage...');
    let totalErrors = 0;
    let errors = [];
    let photosUndefined = [];
    let index = 0;
    const start = new Date();
    // const browser = await playwright.chromium.launch({
    //   headless: true,
    // });
    // const context = await browser.newContext(
    //   playwright.devices['Desktop Chrome'],
    // );
    // const page = await context.newPage();
    for (let item of this._allData) {
      try {
        index++;
        const response = await fetch(item.access_link);
        const body = await response.text();
        console.log('Body..............................', body);
        const $ = cheerio.load(`<html>${body}</html>`);
        item.photo_link = $('#preview').attr('src');
        console.log(`Foto: ${item.photo_link}, Index: ${index}`);

        if (!item.photo_link) photosUndefined.push({ link: item.access_link });

        // await page.goto(item.access_link);
        // const photo_link_src = await page
        //   .locator('#preview')
        //   .getAttribute('src');
        // const baseLinkCaixa = 'https://venda-imoveis.caixa.gov.br';

        // item.photo_link = photo_link_src
        //   ? `${baseLinkCaixa}${photo_link_src}`
        //   : '';
        // console.log(' 00000000', indexData, item.photo_link);
        // indexData++;
      } catch (error: any) {
        totalErrors++;
        errors.push({
          line: index,
          message: error.message,
          link: item.access_link,
        });
        console.error(`Error: ${totalErrors}`, error.message);
      }
    }
    // await context.close();
    // await browser.close();
    const end = new Date();
    console.log(
      `Finished in startTime: ${start.toISOString()}, end: ${end.toISOString()} totalOk: ${index}, totalErrors: ${totalErrors}`,
    );
    console.log(`Photos Undefined`, photosUndefined);
    console.log(`Errors`, errors);
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
