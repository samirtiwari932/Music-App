import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthNavigator from 'src/navigation/AuthNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}