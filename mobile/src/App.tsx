import 'react-native-gesture-handler';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium
} from '@expo-google-fonts/roboto-slab';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import AppProvider from './contexts';
import Routes from './navigation';

const App = () => {
  let [fontsLoaded] = useFonts({ RobotoSlab_400Regular, RobotoSlab_500Medium });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#312e38" />
        <AppProvider>
          <View style={{ flex: 1, backgroundColor: '#312e38' }}>
            <Routes />
          </View>
        </AppProvider>
      </NavigationContainer>
    )
  }
};

registerRootComponent(App);
