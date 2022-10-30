import React from 'react';
import Styles from "./style";

import {
    SafeAreaView,
    Text
} from "react-native";

const Homepage = ({navigation, route}) => {
    return (
        <SafeAreaView>
            <Text>
                Welcome to this page
            </Text>
        </SafeAreaView>
    )
}

export default Homepage;
