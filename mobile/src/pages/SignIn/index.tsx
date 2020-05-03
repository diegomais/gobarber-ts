import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Log in</Title>
            </View>

            <Input name="email" icon="mail" placeholder="Email" />

            <Input name="password" icon="lock" placeholder="Password" />

            <Button
              onPress={() => {
                console.log('Log in button pressed');
              }}
            >
              Log in
            </Button>

            <ForgotPassword
              onPress={() => {
                console.log('Forgot password button pressed');
              }}
            >
              <ForgotPasswordText>Forgot password?</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount onPress={() => navigation.navigate('SignUp')}>
        <Icon color="#ff9000" name="log-in" size={20} />
        <CreateAccountText>Don’t have an account? Sign up</CreateAccountText>
      </CreateAccount>
    </>
  );
};

export default SignIn;
