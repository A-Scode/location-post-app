import { ParamListBase, RouteConfig, StackNavigationState } from "@react-navigation/native";
import { StackNavigationEventMap, StackNavigationOptions } from "@react-navigation/stack";
import { ReactNode } from "react";
import { Text } from "react-native-paper";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import SubmitForm from "../screens/SubmitForm";
import RetrieveData from "../screens/RetrieveData";

type Screens = RouteConfig<ParamListBase, string, StackNavigationState<ParamListBase>, StackNavigationOptions, StackNavigationEventMap> ;



const screens:Screens[]=[
    {
        name:"SignUp",
        children: ()=><Signup/>,
    },
    {
        name:"Login",
        children: ()=><Login/>,
 
    },
    {
        name:"Submit From",
        children: ()=><SubmitForm/>,
    },
    {
        name:"Retrieve",
        children: ()=><RetrieveData/>,
    },
];

export default screens;