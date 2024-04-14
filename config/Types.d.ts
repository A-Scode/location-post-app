import { Dimensions, TextStyle, ViewStyle } from "react-native"
import { MD3Theme } from "react-native-paper"
import { Style } from "react-native-paper/lib/typescript/components/List/utils"


export type CustomTheme = MD3Theme & {
    colors : {
        red : "#ec3242",
    }
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