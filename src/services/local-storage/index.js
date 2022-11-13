import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_PREFS_INDEX = 'intern'

const INITIAL_DEFAULT_PREFs =  {}

export const initializeConfig = async () => {
    return await AsyncStorage.setItem(DEFAULT_PREFS_INDEX, JSON.stringify(INITIAL_DEFAULT_PREFs))
}

export const getKeyValue = async (key) => {
    return await AsyncStorage.getItem(key)
}

export const setKeyValue = async (key, newValue) => {
    return await AsyncStorage.setItem(key, newValue)
}