import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeStorageProvider: FakeStorageProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@domain.com',
      password: 'MySecretPassword',
    });

    const avatarFilename = 'avatar.jpg';
    await updateUserAvatarService.execute({ user_id: user.id, avatarFilename });

    expect(user.avatar).toBe(avatarFilename);
  });

  it('should not be able to update avatar of an unauthenticated user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'unauthenticated-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update user avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@domain.com',
      password: 'MySecretPassword',
    });

    const oldAvatar = 'avatar.jpg';
    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: oldAvatar,
    });

    const newAvatar = 'new-avatar.jpg';
    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: newAvatar,
    });

    expect(deleteFile).toBeCalledWith(oldAvatar);
    expect(user.avatar).toBe(newAvatar);
  });
});
