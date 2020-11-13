import { startOfHour } from 'date-fns';
import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const date = new Date(2020, 4, 10, 13);
    const customer_id = uuid();
    const provider_id = uuid();
    const appointment = await createAppointmentService.execute({
      date,
      customer_id,
      provider_id,
    });

    const appointmentDate = startOfHour(date);

    expect(appointment).toHaveProperty('id');
    expect(appointment.date.toISOString()).toBe(appointmentDate.toISOString());
    expect(appointment.provider_id).toBe(provider_id);
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const date = new Date(2020, 4, 10, 13);
    const customer_id = uuid();
    const provider_id = uuid();
    await createAppointmentService.execute({ date, customer_id, provider_id });

    await expect(
      createAppointmentService.execute({ date, customer_id, provider_id }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        customer_id: uuid(),
        provider_id: uuid(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const user = uuid();

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 13),
        customer_id: user,
        provider_id: user,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8 am and after 5 pm', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 7),
        customer_id: uuid(),
        provider_id: uuid(),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 18),
        customer_id: uuid(),
        provider_id: uuid(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
