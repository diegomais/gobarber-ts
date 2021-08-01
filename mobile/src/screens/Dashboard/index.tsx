import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

import * as S from './styles';

export interface Provider {
  avatar: string;
  avatar_url: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
}

const Dashboard = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const { user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get<Provider[]>('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectProvider = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderText>
          Welcome,
          {'\n'}
          <S.UserName>{user.name}</S.UserName>
        </S.HeaderText>
        <S.ProfileButton onPress={navigateToProfile}>
          <S.UserAvatar source={{ uri: user.avatar_url }} />
        </S.ProfileButton>
      </S.Header>

      <S.ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={<S.ProvidersListHeader>Barber</S.ProvidersListHeader>}
        renderItem={({ item: provider }) => (
          <S.ProviderContainer onPress={() => handleSelectProvider(provider.id)}>
            <S.ProviderAvatar source={{ uri: provider.avatar_url }} />
            <S.ProviderInfo>
              <S.ProviderName>{provider.name}</S.ProviderName>
              <S.ProviderMeta>
                <Feather name="calendar" size={14} color="#ff9000" />
                <S.ProviderMetaText>Monday to Friday</S.ProviderMetaText>
              </S.ProviderMeta>
              <S.ProviderMeta>
                <Feather name="clock" size={14} color="#ff9000" />
                <S.ProviderMetaText>8am to 6pm</S.ProviderMetaText>
              </S.ProviderMeta>
            </S.ProviderInfo>
          </S.ProviderContainer>
        )}
      />
    </S.Container>
  );
};

export default Dashboard;
