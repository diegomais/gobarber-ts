import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background-color: #28262e;
`;

export const HeaderText = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: 20px;
  line-height: 28px;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>,
).attrs({
  contentContainerStyle: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
})``;

export const ProvidersListHeader = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin-bottom: 24px;
`;

export const ProviderContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  background-color: #3e3b47;
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 20px;
`;

export const ProviderAvatar = styled.Image`
  border-radius: 36px;
  height: 72px;
  width: 72px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin-left: 8px;
`;

export const UserAvatar = styled.Image`
  border-radius: 28px;
  height: 56px;
  width: 56px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  line-height: 28px;
`;
