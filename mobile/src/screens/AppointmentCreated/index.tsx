import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import { Provider } from '../CreateAppointment';
import { Container, Description, Header } from './styles';

interface RouteParams {
  date: number;
  provider: Provider;
}

const AppointmentCreated: React.FC = () => {
  const route = useRoute();
  const { reset } = useNavigation();
  const { date, provider } = route.params as RouteParams;

  const description = useMemo(() => {
    return `${provider.name}\n${format(date, 'PPPPp')}`;
  }, [date, provider.name]);

  const handleOk = useCallback(() => {
    reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  }, [reset]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Header>Confirmed book!</Header>
      <Description>{description}</Description>

      <Button onPress={handleOk}>Ok</Button>
    </Container>
  );
};

export default AppointmentCreated;
