import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  storeId: string;
}

@injectable()
class FindStoreProductsService {
  constructor(
    @inject('StoresRepository')
    private repository: IStoresRepository,
  ) {}

  public async execute({ storeId }: IRequest): Promise<Product[]> {
    const store = await this.repository.findById(storeId);

    if (!store) {
      throw new AppError(
        'An error occured while trying to find the store',
        400,
      );
    }

    return store.products;
  }
}

export default FindStoreProductsService;
