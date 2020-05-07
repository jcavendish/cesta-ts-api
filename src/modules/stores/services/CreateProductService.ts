import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IStoresRepository from '../repositories/IStoresRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  storeId: string;
  userId: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    storeId,
    userId,
  }: IRequest): Promise<Product> {
    const store = await this.storesRepository.findById(storeId);

    if (!store || store.ownerId !== userId) {
      throw new AppError(
        'You do not have permission to access this resource',
        403,
      );
    }

    const product = await this.productsRepository.create({
      name,
      price,
      storeId,
    });

    return product;
  }
}

export default CreateProductService;
