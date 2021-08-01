import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  padding: 0 30px ${Platform.OS === 'ios' ? 40 : 150}px;

  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab_500Medium';
  font-size: 24px;
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab_500Medium';
  font-size: 16px;
`;

export const CreateAccount = styled.TouchableOpacity`
  align-items: center;
  border-color: #232129;
  border-top-width: 1px;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  left: 0;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  position: absolute;
  right: 0;
`;

export const CreateAccountText = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab_500Medium';
  font-size: 18px;
  margin-left: 16px;
`;
