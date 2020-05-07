import { Response, Request } from 'express';
import { container } from 'tsyringe';
import TypeOrmStoresRepository from '@modules/stores/infra/typeorm/repositories/TypeOrmStoresRepository';

class UserStoresController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const storeRepository = container.resolve(TypeOrmStoresRepository);
    const stores = await storeRepository.findByOwnerId(userId);

    return response.json(stores);
  }
}

export default UserStoresController;
