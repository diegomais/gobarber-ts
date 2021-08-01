import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import * as Yup from 'yup';

import { useAuth } from '../../contexts/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import * as S from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email is required.')
            .email('Email address is invalid.'),
          password: Yup.string().required('Password is required.'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Log in error', 'Check your credentials and try again.');
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <S.Container>
            <Image source={require('../../../assets/logo.png')} />

            <View>
              <S.Title>Log in</S.Title>
            </View>

            <Form onSubmit={handleSubmit} ref={formRef}>
              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Log in
              </Button>
            </Form>

            <S.ForgotPassword
              onPress={() => {
                console.log('Forgot password button pressed');
              }}
            >
              <S.ForgotPasswordText>Forgot password?</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.CreateAccount onPress={() => navigate('SignUp')}>
        <Feather color="#ff9000" name="log-in" size={20} />
        <S.CreateAccountText>Don’t have an account? Sign up</S.CreateAccountText>
      </S.CreateAccount>
    </>
  );
};

export default SignIn;
