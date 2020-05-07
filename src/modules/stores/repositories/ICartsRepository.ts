import User from '@modules/users/infra/typeorm/entities/User';
import Product from '../infra/typeorm/entities/Product';
import Cart from '../infra/typeorm/entities/Cart';
import ICreateCartDTO from '../dtos/ICreateCartDTO';

export default interface ICartsRepository {
  findById(id: string): Promise<Cart | undefined>;
  findByUserAndProduct(user: User, product: Product): Promise<Cart | undefined>;
  findByUserId(userId: string): Promise<Cart[]>;
  create(cart: ICreateCartDTO): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
  delete(id: string): Promise<void>;
}
