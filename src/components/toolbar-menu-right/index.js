import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

import { GlobalStyles } from "../../GlobalStyle";

export const ToolbarMenuRight = ({ ...props }) => {
    return (<>
        <IconButton
            icon="cog"
            iconColor={MD3Colors.primary50}
            size={24}
            onPress={() => console.log('Pressed')}
        />
    </>)
}

export const ToolbarMenuRightStyle = StyleSheet.create({
    ...GlobalStyles
});