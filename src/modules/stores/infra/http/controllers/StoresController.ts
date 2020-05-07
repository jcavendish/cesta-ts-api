import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateStoreService from '@modules/stores/services/CreateStoreService';
import TypeOrmStoresRepository from '../../typeorm/repositories/TypeOrmStoresRepository';

class StoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id: userId } = request.user;
    const createStore = container.resolve(CreateStoreService);
    const store = await createStore.execute({ name, userId });

    return response.json(store);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const storeRepository = container.resolve(TypeOrmStoresRepository);
    const stores = await storeRepository.findAll();
    return response.json(stores);
  }
}

export default StoresController;
