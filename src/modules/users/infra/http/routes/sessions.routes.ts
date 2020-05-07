import { Router } from 'express';
import AuthenticateController from '../controllers/AuthenticateController';

const routes = Router();
const authenticateController = new AuthenticateController();

routes.post('/', authenticateController.create);

export default routes;
