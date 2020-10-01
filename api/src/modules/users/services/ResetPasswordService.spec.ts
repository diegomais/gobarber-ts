import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
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
});
