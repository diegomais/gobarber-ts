import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Provider } from './index';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface TimeProps {
  available: boolean;
  selected: boolean;
}

interface TimeTextProps {
  selected: boolean;
}

export const BackButton = styled.TouchableOpacity``;

export const Calendar = styled.View``;

export const CalendarHeader = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  background-color: #28262e;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled.Text`
  color: #f5ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>,
).attrs({
  horizontal: true,
  showHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
})``;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 36px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  background: ${({ selected }) => (selected ? '#FF9000' : '#3e3b47')};
  border-radius: 10px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  margin-left: 8px;
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const ScheduleHeader = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionHeader = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Time = styled(RectButton).attrs((props: TimeProps) => ({
  enabled: props.available,
}))<TimeProps>`
  border-radius: 10px;
  margin-right: 8px;
  padding: 12px;
  background-color: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
  opacity: ${({ available }) => (available ? 1 : 0.3)};
`;

export const TimeText = styled.Text<TimeTextProps>`
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
`;

export const ToggleDatePickerButton = styled(RectButton)`
  height: 46px;
  background-color: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const ToggleDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const UserAvatar = styled.Image`
  border-radius: 26px;
  height: 56px;
  width: 56px;
  margin-left: auto;
`;
