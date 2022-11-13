import React from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import { Modal, Portal, Text } from 'react-native-paper';
import {GlobalStyles} from "../../GlobalStyle";

const CreateFolderIntern = () => {
    return <SafeAreaView>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
    </SafeAreaView>
}

export const ModalCreateFolder = () => {
    const [visible, setVisible] = React.useState(false);

    const hideModal = () => setVisible(false);

    return <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={ModalCreateFolderStyles.modalDefault}>
            <CreateFolderIntern />
        </Modal>
    </Portal>
}

export const ModalCreateFolderStyles = StyleSheet.create({
    ...GlobalStyles,
})