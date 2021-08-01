import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import * as S from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button = ({ children, ...rest }: ButtonProps) => (
  <S.Container {...rest}>
    <S.ButtonText>{children}</S.ButtonText>
  </S.Container>
);

export default Button;
