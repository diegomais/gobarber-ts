import React from 'react';
import { FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../contexts/auth';
import { Container, Header, HeaderContent, Profile } from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const mysteryPerson =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

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
      Dashboard
    </Container>
  );
};

export default Dashboard;
