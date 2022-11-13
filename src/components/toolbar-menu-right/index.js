import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

import { GlobalStyles } from "../../GlobalStyle";
import {ButtonRightInToolbarStyle} from "../../pages/homepage/components/ButtonRightInToolbar";

export const ToolbarMenuRight = ({ ...props }) => {
    return <IconButton
        icon={props.icon || 'help'}
        iconColor={props.color || MD3Colors.primary50}
        size={props.size || 24}
        style={props.style}
        onPress={props.onPress} />
}

export const ToolbarMenuRightStyle = StyleSheet.create({
    ...GlobalStyles,
    marginAlignTopToolbar: {
        marginRight: 22
    }
});