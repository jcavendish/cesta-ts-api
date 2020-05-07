import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Store from '../infra/typeorm/entities/Store';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  userId: string;
  name: string;
}

@injectable()
class CreateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, name }: IRequest): Promise<Store> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('You must sign in to create a store', 401);
    }

    const store = await this.storesRepository.create({
      name,
      userId,
    });

    return store;
  }
}
export default CreateStoreService;
