import { Alert } from "react-native";


/**
 * @param {*} title -> String
 * @param {*} message -> String
 * @param {*} callback -> Function
 */
export function showWithConfirmationOnly(title, message, callback) {
    let buttonOk = {
        text: 'OK',
        onPress: () => callback(),
    };

    Alert.alert(title, message, [buttonOk])
}

/**
 * @param {*} title -> String
 * @param {*} message -> String
 * @param {*} onConfirm -> Function
 * @param {*} onCancel -> Function
 */
export function showWithOkCancelButton(title, message, onConfirm, onCancel) {
    let buttonOk = {
        text: 'OK',
        onPress: () => onConfirm(),
    };

    let buttonCancel = {
        text: 'Cancelar',
        onPress: () => onCancel(),
        style: "cancel",
    }

    Alert.alert(title, message, [buttonOk, buttonCancel])
}