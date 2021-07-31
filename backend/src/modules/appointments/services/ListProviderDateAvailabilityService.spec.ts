import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderDateAvailabilityService from './ListProviderDateAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDateAvailabilityService: ListProviderDateAvailabilityService;

describe('ListProviderDailyAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDateAvailabilityService = new ListProviderDateAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the date availability from provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 10, 1, 11, 0, 0).getTime();
    });

    await fakeAppointmentRepository.create({
      customer_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 10, 1, 13, 0, 0),
    });

    await fakeAppointmentRepository.create({
      customer_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 10, 1, 15, 0, 0),
    });

    const availability = await listProviderDateAvailabilityService.execute({
      provider_id: 'user',
      date: 1,
      month: 11,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 12, available: true },
        { hour: 13, available: false },
        { hour: 14, available: true },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
