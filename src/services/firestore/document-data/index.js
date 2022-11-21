import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import * as LocalStorage from '../../local-storage';

/**
 * @type {string} Refered collection to users in Firebase Firestore
 */
export const DOCUMENTDATA_COLLECTION = 'users_notes';

export const getDocumentData = (userEmail) => {
    return firestore().collection(DOCUMENTDATA_COLLECTION)
        .doc(userEmail)
        .get()
}

/**
 * @param {String} userEmail -> email from auth user
 * @returns {Promise<void>}
 */
export const createDocumentData = (userEmail) => {
    return firestore().collection(DOCUMENTDATA_COLLECTION)
        .doc(userEmail)
        .set({
            data: {
                favoritesIds: [],
                folders: [],
                fixedIds: [],
                notes: []
            },
            createdAt: firestore.FieldValue.serverTimestamp(),
        })
}

export const signInUserSystem = async () => {
    await auth().signOut()
    await LocalStorage.initializeConfig();
}