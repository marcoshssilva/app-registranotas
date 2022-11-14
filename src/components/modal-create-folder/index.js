import React, {Component} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import {Modal, Portal, SegmentedButtons, Button, TextInput} from 'react-native-paper';
import {GlobalStyles} from "../../GlobalStyle";
import { EventRegister } from 'react-native-event-listeners'
import * as FoldersDataService from "../../services/firestore/folders-data";

const CreateFolderIntern = () => {
    const [folderName, setFolderName] = React.useState('')
    const [folderDescription, setFolderDescription] = React.useState('')
    const [folderType, setFolderType] = React.useState(FoldersDataService.FOLDER_TYPE_SHARED)

    const createFolder = () => {
        FoldersDataService.addFolder(folderName, folderDescription, folderType)
            .then(
                () => EventRegister.emit("onMustShowModelCreateFolder", false),
                (err) => {
                    console.log(err);
                    EventRegister.emit("onMustShowModelCreateFolder", false)
                }
            )
    }

    const canEnableCreate = () => {
        if (!folderName || !folderType) return false
        return folderName.trim().length > 0 || folderName.trim().length < 16 || folderDescription.length < 100
    }

    return <SafeAreaView>

        <TextInput
            mode={'outlined'}
            label={'Nome da Pasta'}
            placeholder={'Digite...'}
            onChangeText={(text) => setFolderName(text)} />

        <TextInput
            mode={'outlined'}
            placeholder={"Caso queira alguma descrição..."}
            onChangeText={(text) => setFolderDescription(text)}
            multiline={true}
            style={{...ModalCreateFolderStyles.textInputDescription}} />

        <SegmentedButtons style={{marginTop: 16, alignSelf: 'center'}}
            value={folderType}
            onValueChange={setFolderType}
            buttons={[

                {
                    label: 'Privado',
                    value: FoldersDataService.FOLDER_TYPE_PRIVATE
                },
                {
                    label: 'Compartilhado',
                    value: FoldersDataService.FOLDER_TYPE_SHARED
                },
                {
                    label: 'Público',
                    value: FoldersDataService.FOLDER_TYPE_PUBLIC
                },

            ]} />

            <Button onPress={() => createFolder()} mode="contained" style={{marginTop: 16}} disabled={!canEnableCreate()}>
                Criar Pasta Personalizada
            </Button>
    </SafeAreaView>
}

export class ModalCreateFolder extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false }
    }

    componentDidMount() {
        this.listener = EventRegister.addEventListener('onMustShowModelCreateFolder', (mustShow) => {
            this.setState({ visible: mustShow })
        })
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    render() {
        return <Portal>
            <Modal visible={this.state.visible} onDismiss={() => this.setState({visible: false})} contentContainerStyle={ModalCreateFolderStyles.modalDefault}>
                <CreateFolderIntern />
            </Modal>
        </Portal>
    }
}

export function showModalCreateFolder() {
    EventRegister.emit("onMustShowModelCreateFolder", true)
}

export const ModalCreateFolderStyles = StyleSheet.create({
    ...GlobalStyles,
    avatarIcon: {
        alignSelf: 'center',
        marginBottom: 16,
    },
    avatarEmail: {
        textAlign: 'center'
    },
    textInputDescription: {
        height: 100,
        marginTop: 8
    }
})