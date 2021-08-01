import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AppointmentCreated from '../screens/AppointmentCreated';
import Dashboard from '../screens/Dashboard';
import CreateAppointment from '../screens/CreateAppointment';
import Profile from '../screens/Profile';

const App = createStackNavigator();

const AppRoutes = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
    initialRouteName="Dashboard"
  >
    <App.Screen name="AppointmentCreated" component={AppointmentCreated} />
    <App.Screen name="CreateAppointment" component={CreateAppointment} />

    <App.Screen name="Dashboard" component={Dashboard} />

    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppRoutes;
