import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {DOCUMENTDATA_COLLECTION} from "../document-data";
import {randomUUID} from "../../utils/uid";

const USERNAME_LOGGED = auth().currentUser.email;

export const FOLDER_TYPE_PUBLIC = 'public';
export const FOLDER_TYPE_SHARED = 'shared';
export const FOLDER_TYPE_PRIVATE = 'private';

/**
 * @returns {Promise<[]>}
 */
export const getAllFolders = async () => {
    return (await firestore().collection(DOCUMENTDATA_COLLECTION).doc(USERNAME_LOGGED).get())
        .data()?.data.folders
}

export const addFolder = async (folderName, folderDescription, folderVisibility) => {
    // validation folder type
    if (![FOLDER_TYPE_PUBLIC, FOLDER_TYPE_SHARED, FOLDER_TYPE_PRIVATE].includes(folderVisibility)) throw new Error("Invalid folderVisibility");

    const newFolder = {
        name: folderName,
        description: folderDescription,
        icon: 'folder',
        visibility: folderVisibility,
        createAt: firestore.Timestamp.now(),
        lastUpdate: firestore.Timestamp.now(),
        key: randomUUID()
    }

    const folders = await getAllFolders();

    return await firestore().collection(DOCUMENTDATA_COLLECTION).doc(USERNAME_LOGGED)
        .update(
            { 'data.folders': [...folders, newFolder] }
        )
}
