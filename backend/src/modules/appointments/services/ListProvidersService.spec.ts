import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'mail@domain.com',
      password: 'secret',
    });

    const provider1 = await fakeUsersRepository.create({
      name: 'Shane Dean',
      email: 'shane.dean@example.com',
      password: 'callisto',
    });

    const provider2 = await fakeUsersRepository.create({
      name: 'Darren Peck',
      email: 'darren.peck@example.com',
      password: 'bianca',
    });

    const providers = await listProvidersService.execute({ user_id: user.id });

    expect(providers).toEqual([provider1, provider2]);
  });
});
