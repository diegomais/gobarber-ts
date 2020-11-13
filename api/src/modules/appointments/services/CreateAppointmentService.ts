import { getHours, isBefore, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  customer_id: string;
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    customer_id,
    provider_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create an appointment on a past date.');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can not create an appointment on a past date.');
    }

    if (customer_id === provider_id) {
      throw new AppError(
        'You can only create appointments between 8 am and 5 pm.',
      );
    }

    const findAppointmentInSameTime = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameTime) {
      throw new AppError('This time is already booked.');
    }

    const appointment = await this.appointmentsRepository.create({
      customer_id,
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
