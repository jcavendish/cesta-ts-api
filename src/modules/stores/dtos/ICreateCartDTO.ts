import User from '@modules/users/infra/typeorm/entities/User';
import Product from '../infra/typeorm/entities/Product';

export default interface ICreateCartDTO {
  user: User;
  product: Product;
  quantity: number;
}
