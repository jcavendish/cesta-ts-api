import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/models/IHashProvider';
import ITokenProvider from '../providers/models/ITokenProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
}

@injectable()
class AuthenticateService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const authenticatedUser = await this.usersRepository.findByEmail(email);
    if (!authenticatedUser) {
      throw new AppError('Username or password invalid', 400);
    }

    const isPasswordValid = await this.hashProvider.compareHash(
      password,
      authenticatedUser.password,
    );

    if (!isPasswordValid) {
      throw new AppError('Username or password invalid', 400);
    }

    const token = await this.tokenProvider.signUser(authenticatedUser);

    return { token };
  }
}

export default AuthenticateService;
