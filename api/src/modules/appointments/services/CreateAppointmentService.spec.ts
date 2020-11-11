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
    const date = new Date();
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
    const date = new Date();
    const customer_id = uuid();
    const provider_id = uuid();
    await createAppointmentService.execute({ date, customer_id, provider_id });

    await expect(
      createAppointmentService.execute({ date, customer_id, provider_id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
