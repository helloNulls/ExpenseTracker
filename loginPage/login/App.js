import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import SignUp from './components/SignUp';
import Login from './components/Login';


const Stack = createStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
    <StatusBar style="auto"/>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Login} />
        <Stack.Screen name="signin" component={SignUp}/>
      </Stack.Navigator>
    
    </NavigationContainer>
    
  );
}




