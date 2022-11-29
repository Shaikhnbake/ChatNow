import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Import screens
import Start from './components/Start';
import Chat from './components/Chat';

// creates the navigator
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Screen1'>
          <Stack.Screen name='Start' component={Start} />
          <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
}


