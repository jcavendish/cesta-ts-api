import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateService from '@modules/users/services/AuthenticateService';

class AuthenticateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticate = container.resolve(AuthenticateService);
    const token = await authenticate.execute({ email, password });

    return response.json(token);
  }
}

export default AuthenticateController;
