import React from "react";
import { firestore } from "@react-native-firebase/firestore";

import { FAB } from 'react-native-paper';
import { SafeAreaView, TextInput } from "react-native";

import { ViewNotePageStyles } from "./style";
import { addNote, updateNote } from '../../services/firestore/notes-data';
import {showModalEditNotes} from "../../components/modal-edit-notes";

export const ViewNotePage = ({ navigation, route, options }) => {

        const [key, setKey] = React.useState(null)
        const [title, setTitle] = React.useState('')
        const [data, setData] = React.useState('')
        const [foldersKeys, setFoldersKeys] = React.useState([])
        const [isFavorite, setIsFavorite] = React.useState(false)
        const [createAt, setCreateAt] = React.useState(null)
        const [lastUpdate, setLastUpdate] = React.useState(null)
        const [editable, setEditable] = React.useState(true)

        React.useEffect(() => {
            if (route.params.note) {
                const note = route.params.note

                setKey(note.key)
                setTitle(note.title)
                setData(note.data)
                setFoldersKeys(note.foldersKeys)
                setCreateAt(note.createAt)
                setLastUpdate(note.lastUpdate)
            }
        }, [])

        const toogleEditable = () => {
            setEditable(!editable)
        }

        const save = () => {
            if (key) { updateNote(key, title, data, foldersKeys); }
            else {
                addNote(title, data, foldersKeys).then(note => setKey(note.key))
            }
        }

        const openModalEdit = () => {
            if (route.params.note) showModalEditNotes(route.params.note)
        }

        return <SafeAreaView style={{...ViewNotePageStyles.container}}>

            <TextInput 
                style={{...ViewNotePageStyles.noteTextAreaTitle}}
                placeholder={ 'Título' }
                onChangeText={(text) => setTitle(text) }
                editable={editable}
                defaultValue={title}
                />

            <TextInput 
                style={{...ViewNotePageStyles.noteTextAreaDescription}}
                multiline={true}
                placeholder={ 'Digite aqui sua nota...' }
                onChangeText={(text) => setData(text) }
                editable={editable}
                defaultValue={data}
                />

            <FAB
                style={{...ViewNotePageStyles.fabEditableIcon}}
                icon={ editable ? 'pencil' : 'pencil-off-outline' }
                onPress={toogleEditable}
                />

            <FAB
                style={{...ViewNotePageStyles.fabSaveNote}}
                icon={ 'content-save-all-outline' }
                onPress={save}
                />

            <FAB
                style={{...ViewNotePageStyles.fabOpenModalEditNote}}
                icon={ 'dots-vertical-circle-outline' }
                onPress={openModalEdit}
                />

        </SafeAreaView>
}