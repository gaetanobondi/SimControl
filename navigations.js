import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthProvider, useAuth } from "./components/AuthContext";
import React, { useRef } from "react";
import { useColorScheme } from "react-native";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { getColors } from "./utilies/Color";
import { Ionicons } from '@expo/vector-icons';
import { dynamicFontSize } from './utilies/Fonts';
import Info from "./screens/Info";

const colors = getColors();

const LoginStack = createNativeStackNavigator();

function LoginStackGroup({ onLoginSuccess}) {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="Login"
                component={Login}
                initialParams={{onLoginSuccess}}
                options={{
                    headerShown: false
                }}
            />
        </LoginStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function TabGroup() {
    const colors = getColors(useColorScheme());

    return (
        <Tab.Navigator
            sceneContainerStyle={{backgroundColor: colors.background}}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={({route}) => ({headerShown: false, tabBarIcon: () => <Ionicons name="home" size={dynamicFontSize(24)} color={colors.red} />})}
            />
            <Tab.Screen
                name="Info"
                component={Info}
                options={({route}) => ({headerShown: false, tabBarIcon: () => <Ionicons name="information-circle" size={dynamicFontSize(24)} color={colors.red} />})}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    const { userAuthenticated, setAuthenticationStatus } = useAuth();
    const handleLoginSuccess = () => {
        setAuthenticationStatus(true);
    };

    const routeNameRef = useRef();
    const navigationRef = useRef();

    return (
        <>
        { userAuthenticated ? (
            <NavigationContainer 
                ref={navigationRef}
            >
            <TabGroup />
            </NavigationContainer>
        ) : (
            <NavigationContainer 
                ref={navigationRef}
            >
            <LoginStackGroup onLoginSuccess={handleLoginSuccess} />
            </NavigationContainer>
        )}
        </>
    );
}