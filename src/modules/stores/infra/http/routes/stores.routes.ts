import { Router } from 'express';
import productsRouter from './products.routes';
import StoresController from '../controllers/StoresController';

const routes = Router();
const storesController = new StoresController();

routes.use('/', productsRouter);

routes.post('/', storesController.create);
routes.get('/', storesController.index);

export default routes;
