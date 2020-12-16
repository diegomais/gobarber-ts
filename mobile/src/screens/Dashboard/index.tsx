import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Button } from 'react-native';
import { useAuth } from '../../contexts/auth';

import {
  Container,
  Header,
  HeaderText,
  ProfileButton,
  UserAvatar,
  UserName,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderText>
          Welcome,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderText>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <Button title="Sair" onPress={signOut} />
    </Container>
  );
};

export default Dashboard;
