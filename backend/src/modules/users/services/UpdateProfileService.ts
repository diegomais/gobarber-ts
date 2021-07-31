import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  email: string;
  name: string;
  password?: string;
  old_password?: string;
  user_id: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    name,
    password,
    old_password,
    user_id,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError(
        'You have entered an invalid email address or password.',
        401,
      );
    }

    const emailIsAlreadyUsed = await this.usersRepository.findByEmail(email);

    if (emailIsAlreadyUsed && emailIsAlreadyUsed.id !== user_id) {
      throw new AppError('This email address is already used.');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to send the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const oldPasswordIsValid = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!oldPasswordIsValid) {
        throw new AppError('Old password is invalid.', 401);
      }

      const hashedPassword = await this.hashProvider.generateHash(password);

      user.password = hashedPassword;
    }

    user.email = email;
    user.name = name;

    return this.usersRepository.update(user);
  }
}

export default UpdateProfileService;
