import { Feather } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useMemo } from 'react';

import Button from '../../components/Button';
import { Provider } from '../CreateAppointment';

import * as S from './styles';

interface RouteParams {
  date: number;
  provider: Provider;
}

const AppointmentCreated = () => {
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
    <S.Container>
      <Feather name="check" size={80} color="#04d361" />

      <S.Header>Confirmed book!</S.Header>
      <S.Description>{description}</S.Description>

      <Button onPress={handleOk}>Ok</Button>
    </S.Container>
  );
};

export default AppointmentCreated;
