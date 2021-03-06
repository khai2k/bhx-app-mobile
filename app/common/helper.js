import RNFS from 'react-native-fs';
import moment from 'moment';

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
        Number.parseInt(obj).constructor === Number
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
    if (obj === null || obj === undefined) {
        return true;
    }
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
    if (obj === null || obj === undefined) {
        return true;
    }
    const keys = Object.keys(obj);
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
    return `${decimal.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}???`;
};

// B??? d???u ti???ng vi???t
export function removeVietnameseTones(str) {
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
    str = str.replace(/??|??|???|???|??/g, 'i');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
    str = str.replace(/???|??|???|???|???/g, 'y');
    str = str.replace(/??/g, 'd');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
    str = str.replace(/??|??|???|???|??/g, 'I');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
    str = str.replace(/???|??|???|???|???/g, 'Y');
    str = str.replace(/??/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ?? ?? ??  ??, ??, ??, ??, ??
    // Remove extra spaces
    // B??? c??c kho???ng tr???ng li???n nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // B??? d???u c??u, k?? t??? ?????c bi???t
    // str = str.replace(
    //     /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    //     ' '
    // );
    return str;
}
export const checkMinDate = (dateTime) => {
    if (isEmptyOrNull(dateTime) || dateTime === '0001-01-01T00:00:00') {
        return true;
    }
    return false;
};
export const formatExpiredDate = (expiredDateStr) => {
    const expiredDate = moment(expiredDateStr);
    const nowDate = moment();
    const diffDay = Math.abs(nowDate.diff(expiredDate, 'days'));
    if (diffDay < 1) {
        return '';
    }
    if (diffDay > 365) {
        return `HSD c??n ${Math.floor(diffDay / 365)} n??m`;
    }
    if (diffDay > 1095) {
        return 'HSD c??n h??n 3 n??m';
    }
    if (diffDay <= 365 && diffDay > 90) {
        return `HSD c??n ${Math.floor(diffDay / 30)} th??ng`;
    }
    return `HSD c??n ${diffDay} ng??y`;
};
