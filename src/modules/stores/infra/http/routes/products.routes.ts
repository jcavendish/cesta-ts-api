import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ProductsController from '../controllers/StoreProductsController';
import ImportProductsController from '../controllers/ImportProductsController';

const routes = Router();
const storeProductsController = new ProductsController();
const importProductsController = new ImportProductsController();
const upload = multer(uploadConfig);

routes.post('/:storeId/products', storeProductsController.create);
routes.get('/:storeId/products', storeProductsController.index);

routes.post(
  '/:storeId/products/import',
  upload.single('file'),
  importProductsController.create,
);

export default routes;
