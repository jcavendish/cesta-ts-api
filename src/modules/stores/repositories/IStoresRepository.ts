import Store from '../infra/typeorm/entities/Store';
import ICreateStoreDTO from '../dtos/ICreateStoreDTO';

export default interface IStoresRepository {
  findAll(): Promise<Store[]>;
  findById(id: string): Promise<Store | undefined>;
  findByOwnerId(ownerId: string): Promise<Store[]>;
  create({ name, userId }: ICreateStoreDTO): Promise<Store>;
}
