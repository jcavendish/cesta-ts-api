import { sign } from 'jsonwebtoken';
import ITokenProvider from '@modules/users/providers/models/ITokenProvider';
import authConfig from '@config/auth';
import User from '../../typeorm/entities/User';

class JWTProvider implements ITokenProvider {
  public async signUser(user: User): Promise<string> {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign(
      {
        userName: user.name,
        userEmail: user.email,
      },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );
    return token;
  }
}

export default JWTProvider;
