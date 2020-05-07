import { Router } from 'express';
import CartsController from '../controllers/CartsController';

const routes = Router();
const cartsController = new CartsController();

routes.post('/', cartsController.create);
routes.get('/', cartsController.index);
routes.delete('/:cartId', cartsController.delete);

export default routes;
