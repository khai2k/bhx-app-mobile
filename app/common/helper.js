import RNFS from 'react-native-fs';

export function isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Object;
}

export function isArray(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Array;
}

export function isBoolean(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Boolean;
}

export function isFunction(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Function;
}

export function isNumber(obj) {
    return (
        obj !== undefined &&
        obj !== null &&
        !Number.isNaN(obj) &&
        obj.constructor === Number
    );
}

export function isString(obj) {
    return obj !== undefined && obj !== null && obj.constructor === String;
}

export function cloneArray(arr) {
    const arrStr = JSON.stringify(arr);
    return JSON.parse(arrStr);
}

export function isJSON(str) {
    try {
        return JSON.parse(str) && !!str;
    } catch (e) {
        return false;
    }
}

export function isInstanced(obj) {
    if (obj === undefined || obj === null) {
        return false;
    }

    if (isArray(obj)) {
        return false;
    }
    if (isBoolean(obj)) {
        return false;
    }
    if (isFunction(obj)) {
        return false;
    }
    if (isNumber(obj)) {
        return false;
    }
    if (isObject(obj)) {
        return false;
    }
    if (isString(obj)) {
        return false;
    }

    return true;
}

export const isEmpty = (obj) => {
    Object.key(obj).forEach((key) => {
        if (hasProperty(obj, key)) {
            return false;
        }
    });

    return true;
};

export const IsEmptyObject = (obj) => {
    return isEmpty(obj);
};
export const IsEmptyArray = (arr) => {
    return isArray(arr) && arr.length === 0;
};
export function isEmptyOrNull(obj) {
    return obj === undefined || obj === null || obj === '';
}

// Return Boolean
export function IsValidateObject(object) {
    return object !== undefined && object !== null;
}

// Return Boolean
export const hasProperty = (object, property) => {
    return (
        IsValidateObject(object) &&
        Object.prototype.hasOwnProperty.call(object, 'property') &&
        IsValidateObject(object[property])
    );
};

export const getPathImageIOS = (assetPath) => {
    return new Promise(async (resolve, reject) => {
        if (!assetPath.includes('ph://')) {
            resolve(assetPath);
        }
        const dest = `${RNFS.TemporaryDirectoryPath}${Math.random()
            .toString(36)
            .substring(7)}.jpg`;
        try {
            const absolutePath = await RNFS.copyAssetsFileIOS(
                assetPath,
                dest,
                0,
                0
            );
            resolve(absolutePath);
        } catch (error) {
            reject(error);
        }
    });
};

export const formatMoney = (decimal) => {
    return `${decimal.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}₫`;
};
