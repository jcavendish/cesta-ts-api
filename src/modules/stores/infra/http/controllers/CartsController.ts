import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCartService from '@modules/stores/services/CreateCartService';
import RemoveCartService from '@modules/stores/services/RemoveCartService';
import TypeOrmCartsRepository from '../../typeorm/repositories/TypeOrmCartsRepository';

class CartsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { productId } = request.body;

    const createCart = container.resolve(CreateCartService);
    const product = await createCart.execute({ userId, productId });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const repository = container.resolve(TypeOrmCartsRepository);
    const carts = await repository.findByUserId(userId);

    return response.json(carts);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { cartId } = request.params;
    const removeCart = container.resolve(RemoveCartService);

    await removeCart.execute({ userId, cartId });

    return response.sendStatus(204);
  }
}

export default CartsController;
