import React from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import { Modal, Portal, Text } from 'react-native-paper';
import {GlobalStyles} from "../../GlobalStyle";

const SettingsConfigIntern = () => {
    return <SafeAreaView>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
    </SafeAreaView>
}

export const ModalSettingsConfig = () => {
    const [visible, setVisible] = React.useState(false);

    const hideModal = () => setVisible(false);

    return <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={ModalSettingsConfigStyles.modalDefault}>
            <SettingsConfigIntern />
        </Modal>
    </Portal>
}

export const ModalSettingsConfigStyles = StyleSheet.create({
    ...GlobalStyles,
})