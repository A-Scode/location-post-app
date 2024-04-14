import { NavigationContainer , DarkTheme as NavigationDarkTheme , DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import screens from './screens';
import { ToggleButton, adaptNavigationTheme, withTheme } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import { DarkTheme, LightTheme } from '../config/theme';
import merge from 'deepmerge'
import ThemeToggle from '../components/ThemeToggle';
import { PropsWithTheme } from '../config/Types';
import { StatusBar } from 'react-native';

const NaviagtionScreens = ({theme}:PropsWithTheme) => {
    const Stack = createStackNavigator();

    const themeState = useContext(ThemeContext);


    const { LightTheme:NativeLightTheme, DarkTheme:NativeDarkTheme } = adaptNavigationTheme({
        reactNavigationLight: NavigationDefaultTheme,
        reactNavigationDark: NavigationDarkTheme,
      });
      
      const CombinedDefaultTheme = merge(LightTheme, NativeLightTheme);
      const CombinedDarkTheme = merge(DarkTheme, NativeDarkTheme);

      const screenOptions : StackNavigationOptions = {
        headerTitleAlign : "center",
        headerRight : (props)=>(
            <ThemeToggle />
        ),
        headerStyle : {
            backgroundColor : theme.colors.red,
        },
      }

  return (
    <NavigationContainer
      theme={themeState.isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme}>
        <StatusBar backgroundColor={theme.colors.red}barStyle={themeState.isDarkTheme ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Group>
          {screens.map(screen => (
            <Stack.Screen key={screen.name} {...screen} />
          ))}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withTheme(NaviagtionScreens)
