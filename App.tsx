/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { IconButton } from 'react-native-paper';

import PaperProviderConfig from './config/PaperProviderConfig';
import NaviagtionScreens from './routes';
import ThemeProvider from './context/ThemeContext';



function App(): React.JSX.Element {

  return (
    <ThemeProvider >
      <PaperProviderConfig>
        <NaviagtionScreens />
      </PaperProviderConfig>
    </ThemeProvider>
  );
}

export default App;
