import React from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Log in</h1>

        <Input name="email" icon={FiMail} placeholder="Email" />

        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Log in</Button>

        <a href="?">Forgot password?</a>
      </form>

      <a href="?">
        <FiLogIn />
        Sign up
      </a>
    </Content>

    <Background />
  </Container>
);

export default SignIn;
