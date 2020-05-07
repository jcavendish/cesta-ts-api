import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  create({ storeId, name, price }: ICreateProductDTO): Promise<Product>;
  createAll(products: ICreateProductDTO[]): Promise<Product[]>;
}
