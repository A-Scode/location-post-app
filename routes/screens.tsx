import { ParamListBase, RouteConfig, StackNavigationState } from "@react-navigation/native";
import { StackNavigationEventMap, StackNavigationOptions } from "@react-navigation/stack";
import { ReactNode } from "react";
import { Text } from "react-native-paper";
import Signup from "../screens/Signup";

type Screens = RouteConfig<ParamListBase, string, StackNavigationState<ParamListBase>, StackNavigationOptions, StackNavigationEventMap> ;

const screens:Screens[]=[
    {
        name:"SignUp",
        children: ()=><Signup/>,
    },
    {
        name:"Login",
        children: ()=><Text>Login</Text>,
    },
    {
        name:"SubmitFrom",
        children: ()=><Text>SubmitFrom</Text>,
    },
    {
        name:"Retrieve",
        children: ()=><Text>Retrieve</Text>,
    },
];

export default screens;