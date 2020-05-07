import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { Repository, getRepository } from 'typeorm';
import User from '../entities/User';

class TypeOrmUsersRepository implements IUserRepository {
  repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  public async create(user: ICreateUserDTO): Promise<User> {
    const createdUser = this.repository.create(user);

    return this.repository.save(createdUser);
  }
}

export default TypeOrmUsersRepository;
