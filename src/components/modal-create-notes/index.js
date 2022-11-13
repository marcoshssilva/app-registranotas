import React from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import { Modal, Portal, Text } from 'react-native-paper';
import {GlobalStyles} from "../../GlobalStyle";

const CreateNotesIntern = () => {
    return <SafeAreaView>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
    </SafeAreaView>
}

export const ModalCreateNotes = () => {
    const [visible, setVisible] = React.useState(false);

    const hideModal = () => setVisible(false);

    return <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={ModalCreateNotesStyles.modalDefault}>
            <CreateNotesIntern />
        </Modal>
    </Portal>
}

export const ModalCreateNotesStyles = StyleSheet.create({
    ...GlobalStyles,
})