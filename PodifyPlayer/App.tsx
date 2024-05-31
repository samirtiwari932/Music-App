import AppContainer from '@components/AppContainer';
import { NavigationContainer } from '@react-navigation/native';
import Verification from '@views/auth/Verification';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import AppNavigator from 'src/navigation';
import AuthNavigator from 'src/navigation/AuthNavigator';
import store from "src/store"

export default function App() {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContainer>

          <AppNavigator />
        </AppContainer>
      </QueryClientProvider>
    </Provider>
  )
}