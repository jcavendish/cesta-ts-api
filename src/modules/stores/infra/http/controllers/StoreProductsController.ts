import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '@modules/stores/services/CreateProductService';
import FindStoreProductsService from '@modules/stores/services/FindStoreProductsService';

class StoreProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price } = request.body;
    const { storeId } = request.params;
    const { id: userId } = request.user;

    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      name,
      price,
      storeId,
      userId,
    });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { storeId } = request.params;
    const findStoreProducts = container.resolve(FindStoreProductsService);
    const products = await findStoreProducts.execute({ storeId });

    return response.json(products);
  }
}

export default StoreProductsController;
