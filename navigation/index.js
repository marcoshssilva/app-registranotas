import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth';

import Homepage from "../pages/homepage";
import Authpage from "../pages/auth";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
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
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Auth" component={Authpage} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Homepage}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator;