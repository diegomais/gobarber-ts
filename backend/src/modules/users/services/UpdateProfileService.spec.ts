import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateProfileService = new UpdateProfileService(
      fakeHashProvider,
      fakeUsersRepository,
    );
  });

  it('should be able to update name and email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@domain.com',
      password: 'MySecretPassword',
    });

    const name = 'Johnny Doe';
    const email = 'newemail@domain.com';
    const updatedUser = await updateProfileService.execute({
      email,
      name,
      user_id: user.id,
    });

    expect(updatedUser.email).toBe(email);
    expect(updatedUser.name).toBe(name);
  });

  it("should not be able to update a non-existent user's profile", async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'John Doe',
        email: 'email@domain.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the email to an already used email', async () => {
    const user = await fakeUsersRepository.create({
      email: 'email@domain.com',
      name: 'John Doe',
      password: 'MySecretPassword',
    });

    await fakeUsersRepository.create({
      email: 'otheruseremail@domain.com',
      name: 'Mary Doe',
      password: 'Secret',
    });

    await expect(
      updateProfileService.execute({
        email: 'otheruseremail@domain.com',
        name: 'Mary Doe',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'email@domain.com',
      name: 'John Doe',
      password: 'MySecretPassword',
    });

    const password = 'NewPassword';
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: user.email,
      name: user.name,
      old_password: 'MySecretPassword',
      password,
    });

    expect(updatedUser.password).toBe(password);
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'email@domain.com',
      name: 'John Doe',
      password: 'MySecretPassword',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: user.email,
        name: user.name,
        password: 'NewPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'email@domain.com',
      name: 'John Doe',
      password: 'MySecretPassword',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: user.email,
        name: user.name,
        old_password: 'WrongPassword',
        password: 'NewPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
