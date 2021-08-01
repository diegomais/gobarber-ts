import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';

import Button from '../../components/Button';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import * as S from './styles';

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

const CreateAppointment = () => {
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
    <S.Container>
      <S.Header>
        <S.BackButton onPress={handleGoBack}>
          <Feather name="chevron-left" size={24} color="#999591" />
        </S.BackButton>

        <S.HeaderText>Barber</S.HeaderText>

        <S.UserAvatar source={{ uri: user.avatar_url }} />
      </S.Header>

      <S.ProvidersListContainer>
        <S.ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <S.ProviderContainer
              selected={selectedProvider === provider.id}
              onPress={() => handleSelectProvider(provider.id)}
            >
              <S.ProviderAvatar source={{ uri: provider.avatar_url }} />
              <S.ProviderName selected={selectedProvider === provider.id}>
                {provider.name}
              </S.ProviderName>
            </S.ProviderContainer>
          )}
        />
      </S.ProvidersListContainer>

      <S.Calendar>
        <S.CalendarHeader>Choose the date</S.CalendarHeader>

        <S.ToggleDatePickerButton onPress={handleToggleDatePicker}>
          <S.ToggleDatePickerButtonText>Pick a date</S.ToggleDatePickerButtonText>
        </S.ToggleDatePickerButton>

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
      </S.Calendar>

      <S.Schedule>
        <S.ScheduleHeader>Choose the time</S.ScheduleHeader>

        <S.Section>
          <S.SectionHeader>Morning</S.SectionHeader>

          <S.SectionContent>
            {morningAvailability.map(({ available, hour, hourFormatted }) => (
              <S.Time
                key={hour}
                available={available}
                selected={hour === selectedTime}
                onPress={() => handleSelectTime(hour)}
              >
                <S.TimeText>{hourFormatted}</S.TimeText>
              </S.Time>
            ))}
          </S.SectionContent>
        </S.Section>

        <S.Section>
          <S.SectionHeader>Afternoon</S.SectionHeader>

          <S.SectionContent>
            {afternoonAvailability.map(({ available, hour, hourFormatted }) => (
              <S.Time
                key={hour}
                available={available}
                selected={hour === selectedTime}
                onPress={() => handleSelectTime(hour)}
              >
                <S.TimeText>{hourFormatted}</S.TimeText>
              </S.Time>
            ))}
          </S.SectionContent>
        </S.Section>
      </S.Schedule>

      <S.Submit>
        <Button onPress={handleCreateAppointment}>Book</Button>
      </S.Submit>
    </S.Container>
  );
};

export default CreateAppointment;
