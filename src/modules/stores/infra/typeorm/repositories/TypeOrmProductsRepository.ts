import { getRepository, Repository } from 'typeorm';
import ICreateProductDTO from '@modules/stores/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/stores/repositories/IProductsRepository';
import Product from '../entities/Product';

class TypeOrmProductsRepository implements IProductsRepository {
  repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    return this.repository.findOne(id);
  }

  public async create({
    storeId,
    name,
    price,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({ name, storeId, price });

    return this.repository.save(product);
  }

  public async createAll(products: ICreateProductDTO[]): Promise<Product[]> {
    const createdProducts = products.map(product =>
      Object.assign(new Product(), product),
    );

    return this.repository.save(createdProducts);
  }
}

export default TypeOrmProductsRepository;
