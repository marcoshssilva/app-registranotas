import React, {Component} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import { Modal, Portal, Text } from 'react-native-paper';
import {GlobalStyles} from "../../GlobalStyle";
import {EventRegister} from "react-native-event-listeners";
import {ModalCreateFolderStyles} from "../modal-create-folder";

const SettingsConfigIntern = () => {
    return <SafeAreaView>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
    </SafeAreaView>
}

export class ModalSettingsConfig extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false }
    }

    componentDidMount() {
        this.listener = EventRegister.addEventListener('onMustShowModelSettingsConfig', (mustShow) => {
            this.setState({ visible: mustShow })
        })
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    render() {
        return <Portal>
            <Modal visible={this.state.visible} onDismiss={() => this.setState({visible: false})} contentContainerStyle={ModalCreateFolderStyles.modalDefault}>
                <SettingsConfigIntern />
            </Modal>
        </Portal>
    }
}

export function showModalSettingsConfig() {
    EventRegister.emit("onMustShowModelSettingsConfig", true)
}

export const ModalSettingsConfigStyles = StyleSheet.create({
    ...GlobalStyles,
})