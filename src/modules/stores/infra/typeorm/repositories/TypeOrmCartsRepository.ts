import { getRepository, Repository } from 'typeorm';
import ICreateCartDTO from '@modules/stores/dtos/ICreateCartDTO';
import ICartsRepository from '@modules/stores/repositories/ICartsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import Cart from '../entities/Cart';
import Product from '../entities/Product';

class TypeOrmCartsRepository implements ICartsRepository {
  repository: Repository<Cart>;

  constructor() {
    this.repository = getRepository(Cart);
  }

  public async findById(id: string): Promise<Cart | undefined> {
    return this.repository.findOne(id);
  }

  public async findByUserAndProduct(
    user: User,
    product: Product,
  ): Promise<Cart | undefined> {
    return this.repository.findOne({ where: { user, product } });
  }

  public async findByUserId(userId: string): Promise<Cart[]> {
    return this.repository.find({ where: { userId } });
  }

  public async create({
    user,
    product,
    quantity,
  }: ICreateCartDTO): Promise<Cart> {
    const cart = this.repository.create({ user, product, quantity });

    return this.repository.save(cart);
  }

  public async update(cart: Cart): Promise<Cart> {
    return this.repository.save(cart);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default TypeOrmCartsRepository;
