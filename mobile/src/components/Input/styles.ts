import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  background: #232129;
  border-color: #232129;
  border-radius: 10px;
  border-width: 2px;
  height: 60px;
  margin-bottom: 8px;
  padding: 0 16px;
  width: 100%;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const TextInput = styled.TextInput`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;

  flex: 1;
`;
