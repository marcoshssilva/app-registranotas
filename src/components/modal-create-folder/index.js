import React, {Component} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import { Modal, Portal, Text } from 'react-native-paper';
import {GlobalStyles} from "../../GlobalStyle";
import { EventRegister } from 'react-native-event-listeners'

const CreateFolderIntern = () => {
    return <SafeAreaView>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
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
})