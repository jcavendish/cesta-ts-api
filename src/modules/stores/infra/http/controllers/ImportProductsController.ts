import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ImportProductsService from '@modules/stores/services/ImportProductsService';

class ImportProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { storeId } = request.params;
    const { mimetype, filename } = request.file;

    const importProducts = container.resolve(ImportProductsService);
    const products = await importProducts.execute({
      storeId,
      filename,
      mimetype,
    });

    return response.json(products);
  }
}

export default ImportProductsController;
