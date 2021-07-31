import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUserPasswordRecoveryTokensRepository from '../repositories/fakes/FakeUserPasswordRecoveryTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeHashProvider: FakeHashProvider;
let fakeUserPasswordRecoveryTokensRepository: FakeUserPasswordRecoveryTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserPasswordRecoveryTokensRepository = new FakeUserPasswordRecoveryTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();
    resetPasswordService = new ResetPasswordService(
      fakeHashProvider,
      fakeUserPasswordRecoveryTokensRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to reset password using token', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@domain.com',
      password: 'MySecretPassword',
    });

    const { token } = await fakeUserPasswordRecoveryTokensRepository.generate(
      user.id,
    );

    const password = 'MyNewPassword';

    await resetPasswordService.execute({ password, token });

    const updatedUser = await fakeUsersRepository.findByID(user.id);

    expect(generateHash).toBeCalledWith(password);
    expect(updatedUser?.password).toBe(password);
  });

  it('should not be able to reset password with a non-existent token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existent-token',
        password: 'secret',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with a non-existent user', async () => {
    const { token } = await fakeUserPasswordRecoveryTokensRepository.generate(
      'non-existent-user',
    );

    await expect(
      resetPasswordService.execute({ token, password: 'secret' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password using token generated more than 2 hours ago', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@domain.com',
      password: 'MySecretPassword',
    });

    const { token } = await fakeUserPasswordRecoveryTokensRepository.generate(
      user.id,
    );

    await expect(
      resetPasswordService.execute({ password: 'MyNewPassword', token }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
