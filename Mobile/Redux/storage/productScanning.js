import { AsyncStorage } from "react-native";
export const SCANNING_KEY = "scanning:product";

async function read(key, deserializer) {
    try {
        let val = await AsyncStorage.getItem(key);
        if (val !== null) {
            let readValue = JSON.parse(val).map(serialized => {
                return serialized;
            });
            return readValue;
        } else {
            console.info(`${key} not found on disk.`);
        }
    } catch (error) {
        console.warn("AsyncStorage error: ", error.message);
    }
}

async function write(key, item) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
        console.error("AsyncStorage error: ", error.message);
    }
}

export const readSearchedProduct = () => {
    return read(SCANNING_KEY, {}); //?
};

export const writeSearchedProduct = searchedProduct => {
    return write(SCANNING_KEY, searchedProduct);
};

// For debug/test purposes.
// const replaceData = writeDecks(MockDecks);