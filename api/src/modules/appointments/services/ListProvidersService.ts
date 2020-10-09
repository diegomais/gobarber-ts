import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let providers = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    if (!providers) {
      throw new AppError('Providers not found.');
    }

    return providers;
  }
}

export default ListProvidersService;
