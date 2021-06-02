import AsyncStorage from '@react-native-community/async-storage';

import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { helper } from '@app/common';
import { CONST_STORAGE } from '@app/constants';

// Declear const for status code for app.
const STATUS_CODE_SUCCESS_200 = 200;
const STATUS_CODE_SUCCESS_300 = 300;
const STATUS_CODE_SEVER_ERROR = 500;
const STATUS_CODE_UNKNOW = -1;
const STATUS_CODE_INVAILD_TOKEN = 1000;
const STATUS_CODE_TIMEOUT = 1001; // Your error code here.. Default set 1000 + number
const STATUS_CODE_SUCCESS_WITH_ERROR = 1002;
const STATUS_CODE_SUCCESS_WITH_ABORT = 1003;
const STATUS_CODE_FAILED_UPLOAD = 1009; // error upload image file
// import axios from 'axios';
export const STATUS_CODE_MOBLIE_NETWORK = 408; // error upload image file

export const STATUS_CODE = {
    STATUS_CODE_SUCCESS_WITH_ERROR,
    STATUS_CODE_MOBLIE_NETWORK
};

// Declear const for status code for app.
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

export const CONTENT_TYPE = 'content-type';
export const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded';
export const CONTENT_TYPE_JSON = 'application/json';
export const CONTENT_REVERSEHOST = 'http://beta.bachhoaxanh.com';

export const REVERSEHOST = 'ReverseHost';
export const ACCEPT = 'Accept';
export const AUTHORIZATION = 'Authorization';
export const DEVICE_TOKEN = 'DeviceToken';
export const LANGUAGE = 'language';
export const X_AJAX_CALL = 'X-Ajax-Call';

export const HEADER = {
    CONTENT_TYPE,
    CONTENT_TYPE_FORM,
    CONTENT_TYPE_JSON
};

export const appendHeader = (params, headers) => {
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (headers.has(key)) {
            headers.map[key] = params[key];
        } else {
            headers.append(key, params[key]);
        }
    }
};
let _timeoutAPI = -1;
/**
 * Timeout function
 * @param {Integer} time (miliseconds)
 * @param {Promise} promise
 */
const timeout = (time, promise) => {
    return new Promise((resolve, reject) => {
        _timeoutAPI = setTimeout(() => {
            clearTimeout(_timeoutAPI);
            return reject(
                setCustomError(STATUS_CODE_TIMEOUT, 'fetchAPI.error_time_out')
            );
        }, time);
        promise.then(resolve, reject);
    });
};

const handleError = async (error) => {
    // console.log('handleError::: ', error);
    if (
        helper.hasProperty(error, 'code') &&
        error.code === STATUS_CODE_TIMEOUT
    ) {
        const state = await NetInfo.fetch();
        if (state) {
            let msg = '';
            if (helper.hasProperty(state, 'isConnected') && state.isConnected) {
                msg = 'fetchAPI.error_time_out_withConnected';
            } else if (
                helper.hasProperty(state, 'isInternetReachable') &&
                state.isInternetReachable
            ) {
                msg = 'fetchAPI.no_connected';
            } else {
                switch (state.type) {
                    case 'wifi':
                        msg = 'fetchAPI.error_time_out_withConnectedWifi';
                        break;
                    case 'cellular':
                        msg = 'fetchAPI.error_time_out_withConnectedCellular';
                        break;
                    default:
                        // no internet here
                        msg = 'fetchAPI.no_connected';
                        break;
                }
            }

            return Promise.reject(setCustomError(408, error.error, msg));
        }
        return Promise.reject(error);
    } else if (error.toString().includes('TypeError: Network request failed')) {
        const state = await NetInfo.fetch();
        if (state) {
            let msg = '';
            if (helper.hasProperty(state, 'isConnected') && state.isConnected) {
                msg = 'fetchAPI.error_time_out_withConnected';
            } else if (
                helper.hasProperty(state, 'isInternetReachable') &&
                state.isInternetReachable
            ) {
                msg = 'fetchAPI.no_connected';
            } else {
                switch (state.type) {
                    case 'wifi':
                        msg = 'fetchAPI.error_time_out_withConnectedWifi';
                        break;
                    case 'cellular':
                        msg = 'fetchAPI.error_time_out_withConnectedCellular';
                        break;
                    default:
                        // no internet here
                        msg = 'fetchAPI.no_connected';
                        break;
                }
            }

            return Promise.reject(setCustomError(408, error.error, msg));
        }
    }

    // console.log(
    //     'error  ',
    //     error.toString().includes('TypeError: Network request failed')
    // );

    return Promise.reject(
        setCustomError(
            STATUS_CODE_UNKNOW,
            'fetchAPI.error_connect',
            'fetchAPI.error_connect'
        )
    );
};

const checkStatus = (response) => {
    // console.log('checkStatus', response);
    if (
        response.status >= STATUS_CODE_SUCCESS_200 &&
        response.status < STATUS_CODE_SUCCESS_300
    ) {
        return response;
    }

    // Error with another exception 401, 403, 500... handle here
    return response
        .json()
        .then((json) => {
            // console.log('checkStatus: ', json);
            const status = helper.hasProperty(response, 'status')
                ? response.status
                : -1;

            if (status === STATUS_CODE_SEVER_ERROR || status === -1) {
                return Promise.reject(
                    setCustomError(
                        STATUS_CODE_SEVER_ERROR,
                        'Lỗi Sever: ',
                        'fetchAPI.error_server'
                    )
                );
            }
            const error = helper.hasProperty(json, 'error') ? json.error : '';
            let msgError = '';
            if (helper.hasProperty(json, 'error_description')) {
                msgError += json.error_description;
            }
            if (helper.hasProperty(json, 'errorReason')) {
                msgError += json.errorReason;
            }
            return Promise.reject(
                setCustomError(response.status, error, msgError)
            );
        })
        .catch((error) => {
            if (helper.hasProperty(error, 'code')) {
                return Promise.reject(error);
            } else {
                return Promise.reject(
                    setCustomError(0, 'fetchAPI.error_server')
                );
            }
        });
};

const parseJSON = (response) => {
    // console.log('status response: ', response.status);
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
};

export const METHOD = {
    GET,
    POST,
    PUT,
    DELETE
};

export const setCustomError = (
    _code = STATUS_CODE_UNKNOW,
    _error = '',
    _reason = ''
) => {
    return {
        code: _code,
        error: _error,
        errorReason: _reason
    };
};

const getQueryString = (params) => {
    const esc = encodeURIComponent;
    return Object.keys(params)
        .map((k) => {
            return `${esc(k)}=${esc(params[k])}`;
        })
        .join('&');
};

export const apiBase = (
    url,
    method,
    body,
    options = {
        setTimeOut: 5000,
        signal: null,
        navigation: null,
        isCustomToken: false,
        isOauthenToken: false,
        isUpload: false,
        customHeader: {}
    }
) => {
    if (options.signal !== null && options.signal !== undefined) {
        if (options.signal.aborted) {
            return Promise.reject(
                setCustomError(
                    STATUS_CODE_SUCCESS_WITH_ABORT,
                    '',
                    'abortError.name'
                )
            );
        }
    }
    return new Promise((resolve, reject) => {
        AsyncStorage.multiGet(
            [CONST_STORAGE.TOKEN_ACCESS, CONST_STORAGE.CURRENT_LANGUAGE],
            (isTokenError, result) => {
                if (isTokenError) {
                    reject(
                        setCustomError(
                            STATUS_CODE_INVAILD_TOKEN,
                            'token_error',
                            'Không thể lấy được token'
                        )
                    );
                }
                const [[, token], [, language]] = result;

                let headers = new Headers();
                if (options.isCustomToken) {
                    if (options.isOauthenToken) {
                        const params = {
                            [AUTHORIZATION]: CONST_STORAGE.OAUTH_TOKEN,
                            [CONTENT_TYPE]: [CONTENT_TYPE_FORM]
                        };
                        appendHeader(params, headers);
                    } else if (options.isUpload) {
                        const params = {
                            [ACCEPT]: CONTENT_TYPE_JSON,
                            [CONTENT_TYPE]: 'multipart/form-data'
                        };
                        appendHeader(params, headers);
                    } else {
                        headers = options.customHeader;
                    }
                } else {
                    if (helper.IsValidateObject(token) && token.length > 0) {
                        const authen = token;
                        headers.append(AUTHORIZATION, authen);
                        headers.append(LANGUAGE, language);
                    }

                    if (method === METHOD.GET) {
                        const params = {
                            [REVERSEHOST]: CONTENT_REVERSEHOST
                        };
                        appendHeader(params, headers);
                    } else {
                        const params = {
                            [ACCEPT]: CONTENT_TYPE_JSON,
                            [CONTENT_TYPE]: CONTENT_TYPE_JSON,
                            [REVERSEHOST]: CONTENT_REVERSEHOST
                        };
                        appendHeader(params, headers);
                    }
                }

                // console.log('HEADER: ', headers);
                if (!options.isUpload) {
                    /** Configure Body */
                    switch (method) {
                        case METHOD.GET:
                            // append params into url
                            if (helper.IsValidateObject(options.params)) {
                                url += `?${getQueryString(options.params)}`;
                            }

                            break;
                        case METHOD.POST:
                            if (
                                helper.IsValidateObject(headers) &&
                                helper.IsValidateObject(
                                    headers.map[CONTENT_TYPE]
                                )
                            ) {
                                if (
                                    headers.map[CONTENT_TYPE] ===
                                    CONTENT_TYPE_FORM
                                ) {
                                    body = getQueryString(body);
                                    // console.log('CONTENT_TYPE_FORM', body);
                                } else if (
                                    headers.map[CONTENT_TYPE] ===
                                    CONTENT_TYPE_JSON
                                ) {
                                    // add json object into body
                                    body = JSON.stringify(body);
                                    // console.log('CONTENT_TYPE_JSON', body);
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }

                // const controller = {};
                // const _signal = controller.signal;
                // const abortError = {
                //     name: 'AbortError'
                // };

                // if (options.signal !== null && options.signal !== undefined) {
                //     options.signal.addEventListener('abort', () => {
                //         reject(
                //             setCustomError(
                //                 STATUS_CODE_SUCCESS_WITH_ABORT,
                //                 abortError.name,
                //                 abortError.name
                //             )
                //         );
                //     });
                // } else {
                //     _signal.addEventListener('abort', () => {
                //         reject(
                //             setCustomError(
                //                 STATUS_CODE_SUCCESS_WITH_ABORT,
                //                 abortError.name,
                //                 abortError.name
                //             )
                //         );
                //     });
                // }

                let requests = {
                    signal: options.signal,
                    method,
                    headers,
                    body // <-- Post parameters
                };
                if (method === METHOD.GET) {
                    requests = {
                        signal: options.signal,
                        headers,
                        method
                    };
                }
                console.log('API REQUEST: ', url, requests);
                timeout(15000, fetch(url, requests))
                    .catch(handleError) // handle network issues
                    .then(checkStatus)
                    .then(parseJSON)
                    .then((json) => {
                        clearTimeout(_timeoutAPI);
                        // console.log('API RESPONSE: ', json);
                        if (helper.hasProperty(json, 'error')) {
                            const { error } = json;
                            if (error) {
                                const _error = helper.hasProperty(json, 'error')
                                    ? json.error
                                    : '';
                                const errorReason = helper.hasProperty(
                                    json,
                                    'error_description'
                                )
                                    ? json.error_description
                                    : '';
                                reject(
                                    setCustomError(
                                        STATUS_CODE_SUCCESS_WITH_ERROR,
                                        _error,
                                        errorReason
                                    )
                                );
                            }
                        }
                        resolve(json);
                    })
                    .catch((error) => {
                        clearTimeout(_timeoutAPI);
                        // console.log('API RESPONSE ERROR: ', error);
                        reject(error);
                        // reject(setCustomError(STATUS_CODE_SUCCESS_WITH_ERROR, "Vui lòng kiểm tra đường truyền và thử lại", "Vui lòng kiểm tra đường truyền và thử lại"));
                    });
            }
        );
    });
};

export const UploadImage = async (dataImages) => {
    const token = await AsyncStorage.getItem(CONST_STORAGE.TOKEN_ACCESS);
    if (!helper.IsValidateObject(token)) {
        return Promise.reject(
            setCustomError(
                STATUS_CODE_FAILED_UPLOAD,
                'Không lấy được thông tin tài khoản người dùng',
                'Không lấy được thông tin tài khoản người dùng'
            )
        );
    }
    const data = [];
    const arrPromise = [];

    if (Platform.OS === 'ios') {
        dataImages.forEach((img) => {
            arrPromise.push(helper.getPathImageIOS(img.path));
        });
        const arrLocalPathIOS = await Promise.all(arrPromise);
        // console.log(arrLocalPathIOS);
        arrLocalPathIOS.forEach((img, index) => {
            dataImages[index].path = img;
        });
    }

    dataImages.forEach((img) => {
        // const realPath = Platform.OS === 'ios' ? img.path.replace('file://', '') : img.path.replace('file://', '');
        const realPath = img.path.replace('file://', '');
        const image = helper.hasProperty(img, 'isVideo')
            ? {
                  name: 'file',
                  type: img.type,
                  filename: img.filename,
                  data: RNFetchBlob.wrap(realPath)
              }
            : {
                  name: 'file',
                  filename: `${img.filename}`,
                  type: 'image/jpg',
                  data: RNFetchBlob.wrap(realPath)
              };
        data.push(image);
    });
    const _authorization = `Bearer ${token}`;
    RNFetchBlob.fetch(
        'POST',
        'https://devcallcenter.tgdd.vn/mwg-app-media-service/api/media/upload',
        {
            'Content-Type': 'multipart/form-data',
            Authorization: _authorization
        },
        data
    )
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let msg = '';
            if (!helper.IsValidateObject(response)) {
                msg = { errorReason: 'Không tải được ảnh mã lỗi 100' };
            }
            if (response.error) {
                msg = { errorReason: response.errorReason };
            }
            if (!helper.isArray(response.object)) {
                msg = { errorReason: 'Không tải được ảnh mã lỗi 102' };
            }
            if (helper.IsEmptyArray(response.object)) {
                msg = { errorReason: 'Không tải được ảnh mã lỗi 102' };
            }
            if (msg && msg.length > 0) {
                return Promise.reject(msg);
            }
            const listImages = [];
            response.object.forEach((value) => {
                listImages.push(`API_FILE_IMAGE${value}`);
            });
            return Promise.resolve({ images: listImages });
        })
        .catch((err) => {
            // console.log('err: ', err);
            return Promise.reject(
                setCustomError(
                    STATUS_CODE_FAILED_UPLOAD,
                    'Quá trình tải ảnh bị lỗi .Vui lòng thử lại sau',
                    'Quá trình tải ảnh bị lỗi .Vui lòng thử lại sau'
                )
            );
        });
};
