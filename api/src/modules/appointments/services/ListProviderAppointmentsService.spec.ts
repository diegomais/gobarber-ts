import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the appointments from a provider on a specific date', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      customer_id: 'customer',
      provider_id: 'provider',
      date: new Date(2020, 9, 20, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentRepository.create({
      customer_id: 'customer',
      provider_id: 'provider',
      date: new Date(2020, 9, 20, 10, 0, 0),
    });

    const appointment3 = await fakeAppointmentRepository.create({
      customer_id: 'customer',
      provider_id: 'provider',
      date: new Date(2020, 9, 20, 15, 0, 0),
    });

    await fakeAppointmentRepository.create({
      customer_id: 'customer',
      provider_id: 'provider',
      date: new Date(2020, 9, 21, 13, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 10,
      date: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2, appointment3]);
  });
});
