import React from 'react';
import Styles from "./style";

import {
    SafeAreaView,
    Text
} from "react-native";

const Authpage = ({navigator, route}) => {
    return (
        <SafeAreaView style={Styles.root}>
            <Text style={Styles.title}>
                Login Page.
            </Text>
        </SafeAreaView>
    )
}

export default Authpage;
