import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
import * as helper from './helper';

const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
    ios: `${RNFS.DocumentDirectoryPath}/AppBHX`,
    android: `${RNFS.DocumentDirectoryPath}/AppBHX`
});

export const dirPicutures = `${dirHome}/Pictures`;
export const dirAudio = `${dirHome}/Audio`;

export const saveImage = (filePath) => {
    return new Promise(async (resolve, reject) => {
        try {
            const date = new Date();
            // set new image name and filepath
            const newImageName = `${date.getMilliseconds()}.jpg`;
            const newFilepath = `${dirPicutures}/${newImageName}`;
            // move and save image to new filepath
            await RNFS.mkdir(dirPicutures);
            await RNFS.moveFile(filePath, newFilepath);
            resolve(newFilepath);
        } catch (error) {
            reject(error);
        }
    });
};

export const getItem = (key) => {
    return new Promise(async (resolve, reject) => {
        await AsyncStorage.getItem(key)
            .then((values) => {
                resolve(values);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};
export const setItem = (key, value) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(key, value, (error, result) => {
            if (helper.IsValidateObject(error)) {
                return reject(error);
            }
            console.log(`SET ITEM WITH KEY ${key} AND VALUE ${value}`);
            resolve(result);
        });
    });
};
export const multiSet = (arrKeyValue) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.multiSet(arrKeyValue, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

export const deleteAllKeys = (ignoreKeys = []) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getAllKeys((err, keys) => {
            if (err) {
                console.log('error : ', err);
                resolve(null);
            }
            const reKeysDelete = [];
            keys.forEach((key) => {
                const index = ignoreKeys.findIndex((k) => k === key);
                if (index !== -1) {
                    return;
                }
                reKeysDelete.push(key);
            });
            console.log('keys removed ', reKeysDelete);
            AsyncStorage.multiRemove(reKeysDelete, (err) => {
                if (err) {
                    console.log('error : ', err);
                    resolve(null);
                }
                resolve(reKeysDelete);
            });
        });
    });
};
