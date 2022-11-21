import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {DOCUMENTDATA_COLLECTION} from "../document-data";
import {randomUUID} from "../../utils/uid";

/**
 * @returns {Promise<[]>}
 */
export const getAllNotes = async () => {
    const USERNAME_LOGGED = auth().currentUser.email;
    return (await firestore().collection(DOCUMENTDATA_COLLECTION).doc(USERNAME_LOGGED).get())
        .data()?.data.notes
}

export const favoritesIds = async () => {
    const USERNAME_LOGGED = auth().currentUser.email;
    return (await firestore().collection(DOCUMENTDATA_COLLECTION).doc(USERNAME_LOGGED).get())
        .data()?.data.favoritesIds
}

export const fixedIds = async () => {
    const USERNAME_LOGGED = auth().currentUser.email;
    return (await firestore().collection(DOCUMENTDATA_COLLECTION).doc(USERNAME_LOGGED).get())
        .data()?.data.fixedIds
}

export const addNote = async (title, data, foldersKeys) => {
    const USERNAME_LOGGED = auth().currentUser.email;

    const key = randomUUID();

    const newNote = {
        title,
        data,
        foldersKeys,
        createAt: firestore.Timestamp.now(),
        lastUpdate: firestore.Timestamp.now(),
        key: randomUUID(),
    }

    const notes = await getAllNotes();

    await firestore().collection(DOCUMENTDATA_COLLECTION).doc(USERNAME_LOGGED)
        .update(
            { 'data.notes': [newNote, ...notes] }
        )

    return newNote
}

export const getNote = async (key) => {
    const notes = await getAllNotes();

    const find = notes.filter(note => note.key === key)

    if (find.length > 0) return find[0]; else throw new Error("Note not found.")
}

export const getAllNotesByFolderKey = async (folderKey) => {
    const notes = await getAllNotes();
    return notes.filter(note => note.foldersKeys.includes(folderKey))
}

export const updateNote = async (key, title, data, foldersKeys) => {
    const USERNAME_LOGGED = auth().currentUser.email;

    const note = await getNote(key)

    const updatedNote = {
        ...note,
        title,
        data,
        foldersKeys,
        lastUpdate: firestore.Timestamp.now(),
    }

    let notes = await getAllNotes();

    return await firestore().collection(DOCUMENTDATA_COLLECTION).doc(USERNAME_LOGGED)
        .update(
            { 'data.notes': [updatedNote, ...notes.filter(note => note.key !== key)] }
        )
}

export const deleteNote = async (key) => {
    const USERNAME_LOGGED = auth().currentUser.email;
    const notes = await getAllNotes();

    return await firestore().collection(DOCUMENTDATA_COLLECTION).doc(USERNAME_LOGGED)
        .update(
            { 'data.notes': [...notes.filter(note => note.key !== key)] }
        )
}

export const toggleFavoriteNote = async(key) => {
    const USERNAME_LOGGED = auth().currentUser.email;
    const favorites = await favoritesIds();
    const doc = firestore().collection(DOCUMENTDATA_COLLECTION).doc(USERNAME_LOGGED)

    if (favorites.includes(key)) {
        await doc.update({'data.favoritesIds': [...(await favoritesIds()).filter(item => item !== key)]})
    } else {
        await doc.update({'data.favoritesIds': [...favorites, key]})
    }
}

export const toggleFixedNote = async(key) => {
    const USERNAME_LOGGED = auth().currentUser.email;
    const fixedIdsKeys = await fixedIds();
    const doc = firestore().collection(DOCUMENTDATA_COLLECTION).doc(USERNAME_LOGGED)

    if (fixedIdsKeys.includes(key)) {
        await doc.update({'data.fixedIds': [...(await favoritesIds()).filter(item => item !== key)]})
    } else {
        await doc.update({'data.fixedIds': [...fixedIdsKeys, key]})
    }
}

export const toggleFolderHasNote = async(folderKey, noteKey) => {
    const USERNAME_LOGGED = auth().currentUser.email;
    const note = await getNote(noteKey);

    if (note.foldersKeys.includes(folderKey)) {
        return await updateNote(noteKey, note.title, note.data, note.foldersKeys.filter(folder => folder !== folderKey))
    }
    return await updateNote(noteKey, note.title, note.data, [folderKey, ...note.foldersKeys])
}