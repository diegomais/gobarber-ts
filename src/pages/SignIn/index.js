import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
  Strong,
} from './styles';

export default function SignIn({ navigation }) {
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            placeholder="Email Address"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <FormInput
            icon="lock-outline"
            placeholder="Password"
            secureTextEntry
          />
          <SubmitButton onPress={() => {}}>Log in</SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>
            Don’t have an account? <Strong>Sign up</Strong>
          </SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
