import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {getDocumentData} from "../document-data";


const USERNAME_LOGGEDIN = auth().currentUser.email;

export const FOLDER_TYPE_PUBLIC = 'public';
export const FOLDER_TYPE_SHARED = 'shared';
export const FOLDER_TYPE_PRIVATE = 'private';

function getData() {
    return getDocumentData(USERNAME_LOGGEDIN);
}

/**
 * @returns {Promise<[]>}
 */
export const getAllFolders = async () => {
    return (await getData())?._data.data.folders
}

export const addFolder = async (folderName, folderDescription, folderVisibility) => {
    // validation folder type
    if (![FOLDER_TYPE_PUBLIC, FOLDER_TYPE_SHARED, FOLDER_TYPE_PRIVATE].includes(folderVisibility)) throw new Error("Invalid folderVisibility");

    // get folders data
    let folders = await getAllFolders()

    // append in list
    folders.append({
        name: folderName,
        description: folderDescription,
        icon: 'folder',
        visibility: folderVisibility,
        createAt: firestore.FieldValue.serverTimestamp(),
        lastUpdate: firestore.FieldValue.serverTimestamp(),
    })
    // update in firebase
    return getData().update({folders})
}
