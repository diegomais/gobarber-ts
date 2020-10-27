import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDateByProviderDTO from '@modules/appointments/dtos/IFindAllInDateByProviderDTO';
import IFindAllInMonthByProviderDTO from '@modules/appointments/dtos/IFindAllInMonthByProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findAllInDateByProvider(
    data: IFindAllInDateByProviderDTO,
  ): Promise<Appointment[]>;
  findAllInMonthByProvider(
    data: IFindAllInMonthByProviderDTO,
  ): Promise<Appointment[]>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
