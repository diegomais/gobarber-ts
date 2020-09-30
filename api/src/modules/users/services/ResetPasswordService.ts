import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserPasswordRecoveryTokensRepository from '@modules/users/repositories/IUserPasswordRecoveryTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
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

    user.password = password;

    await this.usersRepository.update(user);
  }
}

export default ResetPasswordService;
