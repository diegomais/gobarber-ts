import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const name = 'John Doe';
    const email = 'email@domain.com';
    const password = 'MySecretPassword';
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
  });

  it('should not be able to create a new user with an already registered email', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const name = 'John Doe';
    const email = 'email@domain.com';
    const password = 'MySecretPassword';
    await createUserService.execute({
      name,
      email,
      password,
    });

    expect(
      createUserService.execute({
        email,
        name: 'Foo Bar',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
