import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../GlobalStyle";

export const ViewNotePageStyles = StyleSheet.create({
    ...GlobalStyles,
    container: {
        flex: 1,
        padding: 8,
    },
    noteTextAreaTitle: {
        width: '100%',
        height: 80,
        fontWeight: "600",
        fontSize: 32
    },
    noteTextAreaDescription: {
        width: '100%',
        heigth: '100%',
    },
    fabEditableIcon: {
        position: 'absolute',
        margin: 32,
        right: 0,
        bottom: 0,
    },
    fabSaveNote: {
        position: 'absolute',
        margin: 32,
        right: 0,
        bottom: 0,
        transform: [{translateY: -105 }]
    },
    fabOpenModalEditNote: {
        position: 'absolute',
        margin: 32,
        right: 0,
        bottom: 0,
        transform: [{translateY: -172 }]
    },
})