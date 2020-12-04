import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const name = 'John Doe';
    const email = 'email@domain.com';
    const password = 'MySecretPassword';
    const user = await createUserService.execute({ name, email, password });

    const response = await authenticateUserService.execute({
      email,
      password,
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with a email that does not exist', async () => {
    const email = 'email@domain.com';
    const password = 'MySecretPassword';

    await expect(
      authenticateUserService.execute({ email, password }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    const name = 'John Doe';
    const email = 'email@domain.com';
    const password = 'MySecretPassword';
    await createUserService.execute({ name, email, password });

    await expect(
      authenticateUserService.execute({ email, password: 'WrongPassword' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
