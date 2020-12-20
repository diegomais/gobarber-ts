import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
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
  UserAvatar,
  ToggleDatePickerButton,
  ToggleDatePickerButtonText,
} from './styles';

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
  const { goBack } = useNavigation();
  const route = useRoute();
  const { providerId } = route.params as RouteParams;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    api.get<Provider[]>('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

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

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(prevState => !prevState);
  }, []);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

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
    </Container>
  );
};

export default CreateAppointment;
