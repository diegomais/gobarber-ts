import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameTime = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameTime) {
    return response
      .status(400)
      .json({ message: 'This time is already booked.' });
  }

  const appointment = { id: uuid(), provider, date: parsedDate };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
