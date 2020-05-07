import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICartsRepository from '../repositories/ICartsRepository';

interface IRequest {
  userId: string;
  cartId: string;
}

@injectable()
class RemoveCartService {
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, cartId }: IRequest): Promise<void> {
    const cart = await this.cartsRepository.findById(cartId);

    const user = await this.usersRepository.findById(userId);

    if (!user || !cart || cart.userId !== user.id) {
      throw new AppError('Operation not permitted');
    }

    if (cart.quantity > 1) {
      cart.quantity -= 1;
      await this.cartsRepository.update(cart);
    } else {
      await this.cartsRepository.delete(cart.id);
    }
  }
}

export default RemoveCartService;
