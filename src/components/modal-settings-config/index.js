import React, {Component} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import {Avatar, Button, Divider, Modal, Portal, Text} from 'react-native-paper';
import {GlobalStyles} from "../../GlobalStyle";
import {EventRegister} from "react-native-event-listeners";
import auth from "@react-native-firebase/auth";
import * as AppMessages from "../../services/utils/app-default-messages";
import * as AppAlerts from "../../services/utils/app-alert";
import {signInUserSystem} from "../../services/firestore/document-data";

const SettingsConfigIntern = () => {
    const logout = () => {
        AppAlerts.showWithOkCancelButton(
            AppMessages.ASK_LOGOUT_USER,
            AppMessages.ASK_LOGOUT_USER_DESCRIBE,
            () => {
                signInUserSystem().then(() => {}, () => {}, () => EventRegister.emit("onMustShowModelSettingsConfig", false))
            },
            () => {})
    }

    return <SafeAreaView>

        <Avatar.Icon size={72} icon={"account"} style={{...ModalSettingsConfigStyles.avatarIcon}} />

        <Text
            style={{...ModalSettingsConfigStyles.avatarEmail}}>
            { auth().currentUser.email }
        </Text>

        <Divider style={{marginVertical: 16}} />

        <Button onPress={logout}>
            Sair do Usuário
        </Button>

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
            <Modal visible={this.state.visible} onDismiss={() => this.setState({visible: false})} contentContainerStyle={ModalSettingsConfigStyles.modalDefault}>
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
    avatarIcon: {
        alignSelf: 'center',
        marginBottom: 16,
    },
    avatarEmail: {
        textAlign: 'center',
        fontWeight: '800'
    }
})