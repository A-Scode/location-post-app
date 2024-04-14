import React, { PropsWithChildren, ReactNode, useCallback, useState } from 'react'
import { useColorScheme } from 'react-native'
export const ThemeContext = React.createContext({
    toggle : ()=>{ },
    isDarkTheme : false
})

export type ThemeType = {
    toggle : Function,
    isDarkTheme : boolean
}

const ThemeProvider = ({children}:PropsWithChildren) => {
    const [themeState , setThemeState ] = useState(Boolean(useColorScheme() == "dark"))
    const changeThemeState = useCallback(()=>setThemeState(!themeState) , [themeState])
    const ThemeContextValue = {
        toggle : ()=>{
            changeThemeState();
        },
        isDarkTheme : themeState
    }
  return (
    <ThemeContext.Provider value={ThemeContextValue}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
