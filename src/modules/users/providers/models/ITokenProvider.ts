import User from '@modules/users/infra/typeorm/entities/User';

export default interface ITokenProvider {
  signUser(user: User): Promise<string>;
}
