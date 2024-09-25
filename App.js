import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/redux/store';

export default function App() {
  return (
      <ReduxProvider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </ReduxProvider>
  );
}
