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
    return !Object.keys(obj).every((key) => hasProperty(obj, key));
};
export const isPhoneNumber = (obj) => {
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(obj)) {
        return true;
    }
    return false;
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

export function isEmptyObjectOrNull(obj) {
    if (obj === null) {
        return true;
    }
    const keys = Object.keys(obj);
    console.log(keys.length);
    return keys.length === 0 || obj === null;
}

// Return Boolean
export function IsValidateObject(object) {
    return object !== undefined && object !== null;
}

// Return Boolean
export const hasProperty = (object, property) => {
    return (
        IsValidateObject(object) &&
        Object.prototype.hasOwnProperty.call(object, property) &&
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

// Bỏ dấu tiếng việt
export function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    // str = str.replace(
    //     /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    //     ' '
    // );
    return str;
}
