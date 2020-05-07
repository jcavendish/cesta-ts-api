import fs from 'fs';
import path from 'path';
import csv from 'csv-parse';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  storeId: string;
  mimetype: string;
  filename: string;
}

interface IProductFile {
  storeId: string;
  name: string;
  price: number;
}

@injectable()
class ImportProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({
    storeId,
    mimetype,
    filename,
  }: IRequest): Promise<Product[]> {
    if (mimetype !== 'text/csv') {
      throw new AppError('The file must be a csv');
    }

    const store = await this.storesRepository.findById(storeId);

    if (!store) {
      throw new AppError('An error occured while importing the products');
    }

    const file = path.join(uploadConfig.directory, filename);

    // Skip first line of csv file which is the title
    const parses = csv({
      from_line: 2,
    });

    const readStream = fs.createReadStream(file);
    const readCSV = readStream.pipe(parses);

    const productRecords: IProductFile[] = [];

    readCSV.on('data', async line => {
      // remove space and get name and price from line
      const [name, price] = line.map((cell: string) => cell.trim());

      if (!name || !price) return;

      productRecords.push({ name, price, storeId });
    });

    // Wait until all the records were put into the array then resolve
    await new Promise(resolve => readCSV.on('end', resolve));

    // Delete file from disk
    const isFileInDisk = await fs.promises.stat(file);
    if (isFileInDisk) {
      fs.promises.unlink(file);
    }

    // Create products
    const products = await this.productsRepository.createAll(productRecords);

    return products;
  }
}

export default ImportProductsService;
