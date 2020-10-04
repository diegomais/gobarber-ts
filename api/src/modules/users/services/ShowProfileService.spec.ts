import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const email = 'email@domain.com';
    const name = 'John Doe';
    const password = 'MySecretPassword';
    const user = await fakeUsersRepository.create({
      email,
      name,
      password,
    });

    const profile = await showProfileService.execute({ user_id: user.id });

    expect(profile.email).toBe(email);
    expect(profile.name).toBe(name);
  });

  it('should not be able to show the profile of a user that does not exist', async () => {
    await expect(
      showProfileService.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
