import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import Button from '../../components/Button';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import {
  BackButton,
  Calendar,
  CalendarHeader,
  Container,
  Header,
  HeaderText,
  ProvidersList,
  ProvidersListContainer,
  ProviderAvatar,
  ProviderContainer,
  ProviderName,
  Schedule,
  ScheduleHeader,
  Section,
  SectionContent,
  SectionHeader,
  Submit,
  Time,
  TimeText,
  UserAvatar,
  ToggleDatePickerButton,
  ToggleDatePickerButtonText,
} from './styles';

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

export interface Provider {
  avatar: string;
  avatar_url: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
}

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();
  const route = useRoute();
  const { providerId } = route.params as RouteParams;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  useEffect(() => {
    api.get<Provider[]>('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<AvailabilityItem[]>(
        `/providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            date: selectedDate.getDate(),
          },
        },
      )
      .then(response => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedTime);
      date.setMinutes(0);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', {
        date: date.getTime(),
        provider: providers.find(provider => provider.id === selectedProvider),
      });
    } catch (err) {
      Alert.alert(
        'Error booking',
        'An error occurred while trying to create the schedule, check the data and try again!',
      );
    }
  }, [providers, selectedDate, selectedProvider, selectedTime, navigate]);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleSelectDate = useCallback((event, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const handleSelectTime = useCallback((time: number) => {
    setSelectedTime(time);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(prevState => !prevState);
  }, []);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour <= 12)
      .map(({ available, hour }) => ({
        available,
        hour,
        hourFormatted: format(new Date().setHours(hour, 0), 'p'),
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour > 12)
      .map(({ available, hour }) => ({
        available,
        hour,
        hourFormatted: format(new Date().setHours(hour, 0), 'p'),
      }));
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderText>Barber</HeaderText>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={selectedProvider === provider.id}
              onPress={() => handleSelectProvider(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={selectedProvider === provider.id}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <CalendarHeader>Choose the date</CalendarHeader>

        <ToggleDatePickerButton onPress={handleToggleDatePicker}>
          <ToggleDatePickerButtonText>Pick a date</ToggleDatePickerButtonText>
        </ToggleDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={selectedDate}
            textColor="#f4ede8"
            onChange={handleSelectDate}
            minimumDate={new Date()}
          />
        )}
      </Calendar>

      <Schedule>
        <ScheduleHeader>Choose the time</ScheduleHeader>

        <Section>
          <SectionHeader>Morning</SectionHeader>

          <SectionContent>
            {morningAvailability.map(({ available, hour, hourFormatted }) => (
              <Time
                key={hour}
                available={available}
                selected={hour === selectedTime}
                onPress={() => handleSelectTime(hour)}
              >
                <TimeText>{hourFormatted}</TimeText>
              </Time>
            ))}
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader>Afternoon</SectionHeader>

          <SectionContent>
            {afternoonAvailability.map(({ available, hour, hourFormatted }) => (
              <Time
                key={hour}
                available={available}
                selected={hour === selectedTime}
                onPress={() => handleSelectTime(hour)}
              >
                <TimeText>{hourFormatted}</TimeText>
              </Time>
            ))}
          </SectionContent>
        </Section>
      </Schedule>

      <Submit>
        <Button onPress={handleCreateAppointment}>Book</Button>
      </Submit>
    </Container>
  );
};

export default CreateAppointment;
