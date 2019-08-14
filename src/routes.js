import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/NewAppointment/SelectProvider';
import SelectDateTime from './pages/NewAppointment/SelectDateTime';
import ConfirmAppointment from './pages/NewAppointment/ConfirmAppointment';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Authentication: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            NewAppointment: {
              screen: createStackNavigator(
                { SelectProvider, SelectDateTime, ConfirmAppointment },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: { marginLeft: 20 },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'New Appointment',
                tabBarIcon: (
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                ),
              },
            },
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: { backgroundColor: '#8d41a8' },
            },
          }
        ),
      },
      { initialRouteName: isSigned ? 'App' : 'Authentication' }
    )
  );
