import { format, isAfter, isToday, parseISO } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FiClock, FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import {
  Appointment,
  Calendar,
  Container,
  Content,
  Header,
  HeaderContent,
  NextAppointment,
  Profile,
  Schedule,
  Section,
} from './styles';
import 'react-day-picker/lib/style.css';

interface Appointment {
  id: string;
  date: string;
  hour: string;
  customer: {
    name: string;
    avatar_url: string;
  };
}

interface DayAvailability {
  available: boolean;
  day: number;
}

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<DayAvailability[]>(
    [],
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();
  const mysteryPerson =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

  useEffect(() => {
    api
      .get<DayAvailability[]>(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>(`/appointments/schedule`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          date: selectedDate.getDate(),
        },
      })
      .then(response => {
        const data = response.data.map(appointment => ({
          ...appointment,
          hour: format(parseISO(appointment.date), 'p'),
        }));

        setAppointments(data);
      });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    return monthAvailability
      .filter(day => day.available === false)
      .map(day => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, day.day);
      });
  }, [currentMonth, monthAvailability]);

  const handleChangeDate = useCallback(
    (date: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleChangeMonth = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, 'PP');
  }, [selectedDate]);

  const selectedDayOfWeek = useMemo(() => {
    return format(selectedDate, 'iiii');
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => {
      return isAfter(parseISO(appointment.date), new Date());
    });
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url || mysteryPerson} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Today</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedDayOfWeek}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.customer.avatar_url || mysteryPerson}
                  alt={nextAppointment.customer.name}
                />
                <strong>{nextAppointment.customer.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hour}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período.</p>
            )}

            {morningAppointments.map(({ customer, hour, id }) => (
              <Appointment key={id}>
                <span>
                  <FiClock />
                  {hour}
                </span>

                <div>
                  <img
                    src={customer.avatar_url || mysteryPerson}
                    alt={customer.name}
                  />
                  <strong>{customer.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período.</p>
            )}

            {afternoonAppointments.map(({ customer, hour, id }) => (
              <Appointment key={id}>
                <span>
                  <FiClock />
                  {hour}
                </span>

                <div>
                  <img
                    src={customer.avatar_url || mysteryPerson}
                    alt={customer.name}
                  />
                  <strong>{customer.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleChangeDate}
            onMonthChange={handleChangeMonth}
            selectedDays={selectedDate}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
