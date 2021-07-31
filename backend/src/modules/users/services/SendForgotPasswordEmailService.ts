import path from 'path';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserPasswordRecoveryTokensRepository from '@modules/users/repositories/IUserPasswordRecoveryTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserPasswordRecoveryTokensRepository')
    private userPasswordRecoveryTokensRepository: IUserPasswordRecoveryTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const { token } = await this.userPasswordRecoveryTokensRepository.generate(
      user.id,
    );

    const forgotPasswordMailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot-password.hbs',
    );

    await this.mailProvider.sendMail({
      to: { email: user.email, name: user.name },
      subject: 'Password recovery',
      templateData: {
        file: forgotPasswordMailTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
