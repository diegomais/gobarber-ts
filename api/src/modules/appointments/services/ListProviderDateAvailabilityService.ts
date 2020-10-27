import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDateAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    date,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDateByProvider(
      {
        provider_id,
        date,
        month,
        year,
      },
    );

    const scheduleStart = 8;
    const schedule = Array.from(
      { length: 10 },
      (_, index) => index + scheduleStart,
    );

    const currentDate = new Date(Date.now());

    const availability = schedule.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const requestedDate = new Date(year, month - 1, date, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(requestedDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDateAvailabilityService;
