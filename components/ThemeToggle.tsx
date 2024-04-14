import React, { useContext } from 'react'
import { MD3Theme, ToggleButton, withTheme } from 'react-native-paper'
import { ThemeContext, ThemeType } from '../context/ThemeContext';

type propsType = {
    theme : MD3Theme
}

const ThemeToggle = ({theme}:propsType) => {
    const themeState = useContext(ThemeContext);
    
  return (
    <ToggleButton style={{borderRadius : theme.roundness}} icon={themeState.isDarkTheme? "sunny":"dark-mode"} onPress={()=>themeState.toggle()} />
  )
}

export default withTheme(ThemeToggle)
