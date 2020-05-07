import { Router } from 'express';
import UserStoresController from '../controllers/UserStoresController';

const routes = Router();
const userStoresController = new UserStoresController();

routes.get('/stores', userStoresController.index);

export default routes;
