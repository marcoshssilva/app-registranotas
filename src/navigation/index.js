import React from "react";
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth';

import Homepage from "../pages/homepage";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import ForgotPasswordPage from "../pages/forgot-password";
import { ToolbarMenuRight } from "../components/toolbar-menu-right";
import {showModalSettingsConfig} from "../components/modal-settings-config";
import { ViewNotePage } from "../pages/view-note";
import { showModalEditNotes } from "../components/modal-edit-notes";

export const navigationRef = createNavigationContainerRef();

export const Stack = createNativeStackNavigator();

export function navigate(name, params) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
}

export default RootNavigator = () => {
    const [initializing, setInitializing] = React.useState(true);
    const [user, setUser] = React.useState();

    // change user to logged in
    const onAuthStateChanged = (userData) => {
        setUser(userData)
        if (initializing) setInitializing(false)
    }

    React.useEffect(() => {
        return auth().onAuthStateChanged(onAuthStateChanged);
    }, [])

    if (initializing) return null;

    if (!user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen name="Register" component={RegisterPage} />
                    <Stack.Screen name="Forgot" component={ForgotPasswordPage} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen 
                    name="Home" 
                    component={Homepage} 
                    options={{
                        headerTitle: 'RegistraNotas',
                        headerRight: () => <ToolbarMenuRight icon={'cog'} onPress={() => showModalSettingsConfig()}/>
                    }} 
                    />

                <Stack.Screen 
                    name="ViewNote" 
                    component={ViewNotePage} 
                    options={{
                        headerTitle: 'Nota',
                        headerRight: () => <ToolbarMenuRight icon={'dots-vertical-circle-outline'} onPress={() => showModalEditNotes()}/>
                    }} 
                    />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

 RootNavigator;