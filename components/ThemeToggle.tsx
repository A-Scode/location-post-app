import React, { useContext } from 'react'
import { MD3Theme, ToggleButton, TouchableRipple, withTheme } from 'react-native-paper'
import { ThemeContext, ThemeType } from '../context/ThemeContext';
import { AnyStyle, styleProps } from '../config/Types';

type propsType = {
    theme : MD3Theme
}

const ThemeToggle = ({theme}:propsType) => {
    const themeState = useContext(ThemeContext);
    const styles = createStyles({theme})

    
  return (
    <ToggleButton rippleColor={theme.colors.backdrop} style={styles.toggle} icon={themeState.isDarkTheme? "sunny":"dark-mode"} onPress={()=>themeState.toggle()} />
  )
}

export default withTheme(ThemeToggle)

const createStyles = ({theme}:styleProps):AnyStyle=>({
    toggle:{
        borderRadius : 50 ,
        marginRight : 10,
    }
})
