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

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
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
              <Title>Sign up</Title>
            </View>

            <Input name="name" icon="user" placeholder="Name" />

            <Input name="email" icon="mail" placeholder="Email" />

            <Input name="password" icon="lock" placeholder="Password" />

            <Button
              onPress={() => {
                console.log('Sign up button pressed');
              }}
            >
              Sign up
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon color="#f4ede8" name="arrow-left" size={20} />
        <BackToSignInText>Back to log in</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
