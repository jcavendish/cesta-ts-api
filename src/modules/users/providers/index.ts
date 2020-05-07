import { container } from 'tsyringe';

import IHashProvider from './models/IHashProvider';
import BCryptHashProvider from '../infra/providers/implementations/BCryptHashProvider';

import ITokenProvider from './models/ITokenProvider';
import JWTProvider from '../infra/providers/implementations/JWTProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<ITokenProvider>('TokenProvider', JWTProvider);
