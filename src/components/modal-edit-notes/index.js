import React, {Component} from "react";
import {FlatList, SafeAreaView, StyleSheet, View} from "react-native";
import {IconButton, List, MD3Colors, Modal, Portal, Text} from 'react-native-paper';
import {GlobalStyles} from "../../GlobalStyle";
import {EventRegister} from "react-native-event-listeners";
import {ModalCreateFolderStyles} from "../modal-create-folder";
import * as NotesService  from "../../services/firestore/notes-data";
import * as FolderService from "../../services/firestore/folders-data";
import {
    deleteNote,
    toggleFavoriteNote,
    toggleFixedNote,
    toggleFolderHasNote
} from "../../services/firestore/notes-data";
import {navigate} from "../../navigation";
import {ListItemFolder} from "../list-item-folder";

const EditNotesIntern = ({note}) => {
    const [favoriteIds, setFavoriteIds] = React.useState([])
    const [fixedIds, setFixedIds] = React.useState([])
    const [folders, setFolders] = React.useState([])

    React.useEffect(() => {
        NotesService.favoritesIds().then(data => setFavoriteIds(data))
    }, [favoriteIds])

    React.useEffect(() => {
        NotesService.fixedIds().then(data => setFixedIds(data))
    }, [fixedIds])

    React.useEffect(() => {
        FolderService.getAllFolders().then(data => setFolders(data))
    }, [folders])

    const onClickDelete = () => {
        deleteNote(note.key)
            .then(() => EventRegister.emit("onMustShowModelEditNotes", { mustShow: false, note: null }))
            .then(() => navigate('PrincipalPanel', {}))
    }

    const onClickFavorite = () => {
        toggleFavoriteNote(note?.key)
    }

    const onClickFixed = () => {
        toggleFixedNote(note?.key)
    }

    const onClickToggleFolder = (folderKey) => {
        toggleFolderHasNote(folderKey, note.key)
    }

    const renderItemFolder = ({item}) => <ListItemFolder title={item.name} checked={note.foldersKeys.includes(item.key)} onPress={() => onClickToggleFolder(item.key) }/>

    return <SafeAreaView>
        <View style={ModalCreateEditStyles.rowItensField}>
            <IconButton icon={fixedIds.includes(note?.key) ? "pin" : "pin-off"}
                        onPress={onClickFixed} />

            <IconButton icon={favoriteIds.includes(note?.key) ? "cards-heart" :"cards-heart-outline"}
                        iconColor={favoriteIds.includes(note?.key) ? MD3Colors.error50 : MD3Colors.error10}
                        onPress={onClickFavorite} />

            <IconButton icon={'delete'}
                        onPress={onClickDelete} />
        </View>

        <List.Accordion title={'Pastas Personalizadas'}
                        left={props => <List.Icon icon="folder" /> }>

            <FlatList data={folders}
                      renderItem={renderItemFolder}
                      />
        </List.Accordion>

    </SafeAreaView>
}

export class ModalEditNotes extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false, note: null }
    }

    componentDidMount() {
        this.listener = EventRegister.addEventListener('onMustShowModelEditNotes', (data) => {
            this.setState({ visible: data.mustShow, note: data.note })
        })
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    render() {
        return <Portal>
            <Modal visible={this.state.visible} onDismiss={() => this.setState({visible: false})} contentContainerStyle={ModalCreateFolderStyles.modalDefault}>
                <EditNotesIntern note={this.state.note} />
            </Modal>
        </Portal>
    }
}

export function showModalEditNotes(note) {
    EventRegister.emit("onMustShowModelEditNotes", { mustShow: true, note })
}

export const ModalCreateEditStyles = StyleSheet.create({
    ...GlobalStyles,
})