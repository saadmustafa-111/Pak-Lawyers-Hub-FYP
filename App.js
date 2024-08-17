
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import Splashscreen from './src/Splashscreen';
import Secondscreen from './src/Secondscreen';
import Login from './src/Login';
import Signup from './src/signup';
import ClientModule from './src/ClientModule';
import LawyerModule from './src/LawyerModule';
import Case from './src/Case';
import AppointmentScreen from './src/Appointment';
import ChatScreen from './src/Consultation';
import dashboard from './src/component/dashboard';
import LawyerAppointment from './src/component/LawyerAppointment';
import { Provider } from 'react-redux';
import store from './Redux/store';
import LawyerProfile from './src/component/LawyerProfile';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splashscreen} />
            <Stack.Screen name="Sscreen" component={Secondscreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CModule" component={ClientModule} />
            <Stack.Screen name="LModule" component={LawyerModule} />
            <Stack.Screen name="Case" component={Case} />
            <Stack.Screen name="Appointment" component={AppointmentScreen} />
            <Stack.Screen name="Consultation" component={ChatScreen} />
            <Stack.Screen name="Dashboard" component={dashboard} />
            <Stack.Screen name="LawyerAppointment" component={LawyerAppointment} />
            <Stack.Screen name="LawyerProfile" component={LawyerProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
