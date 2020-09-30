import AppError from '@shared/errors/AppError';
import FakeUserPasswordRecoveryTokensRepository from '../repositories/fakes/FakeUserPasswordRecoveryTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserPasswordRecoveryTokensRepository: FakeUserPasswordRecoveryTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserPasswordRecoveryTokensRepository = new FakeUserPasswordRecoveryTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();
    resetPasswordService = new ResetPasswordService(
      fakeUserPasswordRecoveryTokensRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to reset password using token', async () => {
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

    expect(updatedUser?.password).toBe(password);
  });
});
