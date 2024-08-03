import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useRef } from "react";
import { useColorScheme } from "react-native";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { getColors } from "./utilies/Color";

const Tab = createBottomTabNavigator();

function TabGroup() {
    const colors = getColors(useColorScheme());

    return (
        <Tab.Navigator
            sceneContainerStyle={{backgroundColor: colors.background}}
        >
            <Tab.Screen
                name="Login"
                component={Home}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    const navigationRef = useRef();

    return (
        <NavigationContainer 
            ref={navigationRef}
        >
            <TabGroup />
        </NavigationContainer>
    );
}