import React from 'react';
import { Form } from '@unform/web';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Sign up</h1>

          <Input name="name" icon={FiUser} placeholder="Name" />

          <Input name="email" icon={FiMail} placeholder="Email" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />

          <Button type="submit">Sign up</Button>
        </Form>

        <a href="?">
          <FiArrowLeft />
          Log in
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
