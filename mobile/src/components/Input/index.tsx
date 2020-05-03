import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <Container>
    <Icon color="#666360" name={icon} size={20} />

    <TextInput
      keyboardAppearance="dark"
      placeholderTextColor="#666360"
      {...rest}
    />
  </Container>
);

export default Input;
