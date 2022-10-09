import React from 'react';
import Styles from "./style";

import {
    SafeAreaView,
    Text
} from "react-native";

const Homepage = ({navigator, route}) => {
    return (
        <SafeAreaView style={Styles.root}>
            <Text style={Styles.title}>
                Welcome to this page
            </Text>
        </SafeAreaView>
    )
}

export default Homepage;
