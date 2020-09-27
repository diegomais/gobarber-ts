import { startOfHour } from 'date-fns';
import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const date = new Date();
    const provider_id = uuid();
    const appointment = await createAppointmentService.execute({
      date,
      provider_id,
    });

    const appointmentDate = startOfHour(date);

    expect(appointment).toHaveProperty('id');
    expect(appointment.date.toISOString()).toBe(appointmentDate.toISOString());
    expect(appointment.provider_id).toBe(provider_id);
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const date = new Date();
    const provider_id = uuid();
    await createAppointmentService.execute({ date, provider_id });

    await expect(
      createAppointmentService.execute({ date, provider_id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
