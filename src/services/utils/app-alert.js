import { Alert } from "react-native";


/**
 * @param {String} title
 * @param {String} message
 * @param {Function} callback
 */
export function showWithConfirmationOnly(title, message, callback) {
    let buttonOk = {
        text: 'OK',
        onPress: () => callback(),
    };

    Alert.alert(title, message, [buttonOk])
}

/**
 * @param {String}  title
 * @param {String} message
 * @param {Function} onConfirm
 * @param {Function} onCancel
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