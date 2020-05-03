import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #ff9000;
  border-radius: 10px;
  height: 60px;
  margin-top: 8px;
  width: 100%;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;
