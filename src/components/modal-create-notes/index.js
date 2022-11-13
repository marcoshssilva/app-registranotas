import React, {Component} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import { Modal, Portal, Text } from 'react-native-paper';
import {GlobalStyles} from "../../GlobalStyle";
import {EventRegister} from "react-native-event-listeners";
import {ModalCreateFolderStyles} from "../modal-create-folder";

const CreateNotesIntern = () => {
    return <SafeAreaView>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
    </SafeAreaView>
}

export class ModalCreateNotes extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false }
    }

    componentDidMount() {
        this.listener = EventRegister.addEventListener('onMustShowModelCreateNotes', (mustShow) => {
            this.setState({ visible: mustShow })
        })
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    render() {
        return <Portal>
            <Modal visible={this.state.visible} onDismiss={() => this.setState({visible: false})} contentContainerStyle={ModalCreateFolderStyles.modalDefault}>
                <CreateNotesIntern />
            </Modal>
        </Portal>
    }
}

export function showModalCreateNotes() {
    EventRegister.emit("onMustShowModelCreateNotes", true)
}

export const ModalCreateNotesStyles = StyleSheet.create({
    ...GlobalStyles,
})