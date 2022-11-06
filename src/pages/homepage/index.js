import React from 'react';
import {Styles} from "./style";

import auth from "@react-native-firebase/auth";
import {createDocumentData, getDocumentData} from "../../services/firestore/document-data";

import {
    SafeAreaView,
    Text
} from "react-native";

const Homepage = ({navigation, route}) => {
    getDocumentData(auth().currentUser.email).then((onComplete) => { if (!onComplete.exists) createDocumentData(auth().currentUser.email);})
    return (
        <SafeAreaView>
            <Text>
                Welcome to this page
            </Text>
        </SafeAreaView>
    )
}

export default Homepage;
