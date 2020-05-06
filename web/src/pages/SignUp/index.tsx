import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../contexts/toast';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, AnimationContainer, Background } from './styles';
import logoImg from '../../assets/logo.svg';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required.'),
          email: Yup.string()
            .required('Email is required.')
            .email('Email address is invalid.'),
          password: Yup.string().min(
            6,
            'Password must contain at least 6 characters.',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Registration completed.',
          description: 'Now you can log in to GoBarber!',
        });

        history.push('/');
      } catch (error) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Registration error',
          description: 'An error occurred while registering, please try again.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
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

          <Link to="/">
            <FiArrowLeft />
            Log in
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
