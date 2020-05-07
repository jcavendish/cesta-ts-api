import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO';
import { getRepository, Repository } from 'typeorm';
import Store from '../entities/Store';

class TypeOrmStoresRepository implements IStoresRepository {
  repository: Repository<Store>;

  constructor() {
    this.repository = getRepository(Store);
  }

  public async findAll(): Promise<Store[]> {
    return this.repository.find();
  }

  public async findById(id: string): Promise<Store | undefined> {
    return this.repository.findOne(id);
  }

  public async findByOwnerId(ownerId: string): Promise<Store[]> {
    return this.repository.find({
      where: { ownerId },
    });
  }

  public async create({ userId, name }: ICreateStoreDTO): Promise<Store> {
    const store = this.repository.create({ name, ownerId: userId });

    return this.repository.save(store);
  }
}

export default TypeOrmStoresRepository;
