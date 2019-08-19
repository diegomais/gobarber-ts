import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 60px 0 30px;
`;

export const DateButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 0 30px;
  padding: 0 15px;
  height: 46px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
`;

export const DateText = styled.Text`
  margin-left: 15px;
  font-size: 14px;
  color: #fff;
`;

export const Picker = styled.View`
  margin-top: 30px;
  padding: 15px 30px;
  background: #fff;
`;
