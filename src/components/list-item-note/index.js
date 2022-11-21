import React from "react";
import {List, IconButton, MD3Colors} from "react-native-paper";
import {SafeAreaView, StyleSheet} from "react-native";
import {GlobalStyles} from "../../GlobalStyle";
import {toggleFavoriteNote, toggleFixedNote} from "../../services/firestore/notes-data";
import {navigate} from "../../navigation";

export const ListItemNote = (props) => {

    const [note, setNote] = React.useState(props.note)
    const [favorite, setFavorite] = React.useState(props.isFavorite)
    const [fixed, setFixed] = React.useState(props.isFixed)

    function toggleFavorite(key) {
        toggleFavoriteNote(key).then(r => setFavorite(!favorite))
    }

    function toggleFixed(key) {
        toggleFixedNote(key).then(r => setFixed(!fixed))
    }

    function openItem() {
        navigate("ViewNote", { note })
    }

    return <List.Item
                title={ note.title }
                onPress={() => openItem()}
                description={ note.createAt.toDate().toLocaleString() }
                left={ props => <List.Icon {...props} icon="notebook" /> }
                right={
                    props => <SafeAreaView style={ListItemNoteStyles.rowItensField}>
                                    <IconButton
                                        {...props}
                                        icon={fixed ? "pin" : "pin-off"}
                                        onPress={() => toggleFixed(note.key)}
                                        />

                                    <IconButton
                                        {...props}
                                        icon={favorite ? "cards-heart" :"cards-heart-outline"}
                                        iconColor={favorite ? MD3Colors.error50 : MD3Colors.error10}
                                        onPress={() => toggleFavorite(note.key)}
                                        />
                             </SafeAreaView> }
                />
}

export const ListItemNoteStyles = StyleSheet.create({
    ...GlobalStyles
})