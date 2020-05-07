import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICartsRepository from '../repositories/ICartsRepository';
import Cart from '../infra/typeorm/entities/Cart';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  userId: string;
  productId: string;
}

@injectable()
class CreateCartService {
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, productId }: IRequest): Promise<Cart> {
    const product = await this.productsRepository.findById(productId);

    const user = await this.usersRepository.findById(userId);

    if (!user || !product) {
      throw new AppError('Operation not permitted', 403);
    }

    const cartFound = await this.cartsRepository.findByUserAndProduct(
      user,
      product,
    );

    if (cartFound) {
      cartFound.quantity += 1;
      return this.cartsRepository.update(cartFound);
    }

    return this.cartsRepository.create({
      product,
      user,
      quantity: 1,
    });
  }
}

export default CreateCartService;
