import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserPasswordRecoveryTokensRepository from '@modules/users/repositories/IUserPasswordRecoveryTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserPasswordRecoveryTokensRepository')
    private userPasswordRecoveryTokensRepository: IUserPasswordRecoveryTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userPasswordRecoveryToken = await this.userPasswordRecoveryTokensRepository.findByToken(
      token,
    );

    if (!userPasswordRecoveryToken) {
      throw new AppError('Token does not exist.');
    }

    const user = await this.usersRepository.findByID(
      userPasswordRecoveryToken.user_id,
    );

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const tokenExpirationDate = addHours(
      userPasswordRecoveryToken.created_at,
      2,
    );

    if (isAfter(Date.now(), tokenExpirationDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.update(user);
  }
}

export default ResetPasswordService;
