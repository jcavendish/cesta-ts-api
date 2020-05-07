import { container } from 'tsyringe';

import '@modules/users/providers';

import TypeOrmStoresRepository from '@modules/stores/infra/typeorm/repositories/TypeOrmStoresRepository';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';

import TypeOrmProductsRepository from '@modules/stores/infra/typeorm/repositories/TypeOrmProductsRepository';
import IProductsRepository from '@modules/stores/repositories/IProductsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import TypeOrmUsersRepository from '@modules/users/infra/typeorm/repositories/TypeOrmUsersRepository';

import ICartsRepository from '@modules/stores/repositories/ICartsRepository';
import TypeOrmCartsRepository from '@modules/stores/infra/typeorm/repositories/TypeOrmCartsRepository';

container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  TypeOrmStoresRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  TypeOrmProductsRepository,
);

container.registerSingleton<ICartsRepository>(
  'CartsRepository',
  TypeOrmCartsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  TypeOrmUsersRepository,
);
