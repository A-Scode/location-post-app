import React, { FC, PropsWithChildren, ReactChildren, ReactComponentElement, useContext } from 'react'
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DarkTheme, LightTheme } from './theme';
import { ThemeContext, ThemeType } from '../context/ThemeContext';


const PaperProviderConfig = ({children}:PropsWithChildren) => {
    const themeState = useContext(ThemeContext);
  return (
    <PaperProvider theme={themeState.isDarkTheme?DarkTheme:LightTheme } settings={{
        icon : props=><MaterialIcons {...props} />
      }}>
        {children}
    </PaperProvider>
  )
}

export default PaperProviderConfig
