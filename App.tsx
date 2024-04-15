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
import LoginContextProvider from './context/LoginContext';
import { MMKVLoader } from 'react-native-mmkv-storage';
import QueryProvider from './context/QueryContext';
import ToastContextProvider from './context/ToastContext';

export const storage = new MMKVLoader().withEncryption().initialize()

function App(): React.JSX.Element {

  return (
    <QueryProvider>
      <ThemeProvider>
        <ToastContextProvider>
          <LoginContextProvider>
            <PaperProviderConfig>
              <NaviagtionScreens />
            </PaperProviderConfig>
          </LoginContextProvider>
        </ToastContextProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
