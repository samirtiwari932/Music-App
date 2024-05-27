import AppContainer from '@components/AppContainer';
import { NavigationContainer } from '@react-navigation/native';
import Verification from '@views/auth/Verification';
import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from 'src/navigation';
import AuthNavigator from 'src/navigation/AuthNavigator';
import store from "src/store"

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer>

        <AppNavigator />
      </AppContainer>
    </Provider>
  )
}