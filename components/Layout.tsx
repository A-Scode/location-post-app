import React, { PropsWithChildren, ReactNode } from 'react'
import { FlexStyle, ProgressBarAndroidComponent, TextStyle, View, ViewStyle, } from 'react-native'
import { withTheme } from 'react-native-paper'
import { AnyStyle, CustomTheme, styleProps } from '../config/Types'
import { Style } from 'react-native-paper/lib/typescript/components/List/utils'

type propsType = {
    loading? : boolean,
    theme : CustomTheme,
    children? : ReactNode | undefined
}


const Layout = ({loading = false , theme , children} : propsType) => {
    const styles = createStyles({theme})
  return (
    <View style= {styles.container}>
        {children}
    </View>
  )
}

export default withTheme(Layout)



const createStyles = ({theme}:styleProps):AnyStyle=>({
    container : {
        flex : 1,
        backgroundColor : theme?.colors.background,
        padding : 5,
    },
})
