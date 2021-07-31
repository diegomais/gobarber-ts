import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserPasswordRecoveryTokensRepository from '../repositories/fakes/FakeUserPasswordRecoveryTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUserPasswordRecoveryTokensRepository: FakeUserPasswordRecoveryTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUserPasswordRecoveryTokensRepository = new FakeUserPasswordRecoveryTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeMailProvider,
      fakeUserPasswordRecoveryTokensRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to recover password using e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@domain.com',
      password: 'MySecretPassword',
    });

    await sendForgotPasswordEmailService.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover password of a user that does not exist', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({ email: 'email@domain.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a recovery password token', async () => {
    const generateToken = jest.spyOn(
      fakeUserPasswordRecoveryTokensRepository,
      'generate',
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@domain.com',
      password: 'MySecretPassword',
    });

    await sendForgotPasswordEmailService.execute({ email: user.email });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
