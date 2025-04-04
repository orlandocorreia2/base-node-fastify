import { inject, injectable } from 'tsyringe';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { exec } from 'child_process';
import path from 'path';
import { CreateAuctionPropertiesBatchUseCaseInterface } from './interfaces/create.auction.properties.batch.usecase.interface';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { CreateAuctionPropertiesBatchUseCaseExecuteResponseProps } from './types';
import { CreateAuctionPropertyRepositoryProps } from '../repositories/types';
import { sleep } from '../../../utils/util';
import { getDataExtraction } from '../../../utils/csv';

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
  ) {
    this._totalRows = 0;
    this._totalRowsAddedAllData = 0;
  }

  public async execute(
    createdById: string,
  ): Promise<CreateAuctionPropertiesBatchUseCaseExecuteResponseProps> {
    await this.downloadFile();
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

  private downloadFile() {
    console.log('Start download file...');
    return new Promise(async resolve => {
      exec(
        `npx playwright test ${path.resolve(process.cwd())}`,
        (error, _, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
          }
          console.log('Finish download file...');
          resolve(true);
        },
      );
    });
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
