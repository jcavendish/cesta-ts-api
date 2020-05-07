import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import storesRouter from '@modules/stores/infra/http/routes/stores.routes';
import cartsRouter from '@modules/stores/infra/http/routes/carts.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/stores', ensureAuth, storesRouter);
routes.use('/carts', ensureAuth, cartsRouter);
routes.use('/profile', ensureAuth, profilesRouter);

export default routes;
