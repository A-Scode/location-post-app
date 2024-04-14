import { Dimensions, TextStyle, ViewStyle } from "react-native"
import { MD3Theme } from "react-native-paper"
import { Style } from "react-native-paper/lib/typescript/components/List/utils"


export interface CustomTheme extends MD3Theme {

}
export type styleProps = {
    theme? : CustomTheme,
    dimensions? : Dimensions
}
export type AnyStyle = {
    [key:string] : Style | ViewStyle | TextStyle

}

export interface PropsWithTheme {
    theme : CustomTheme
}