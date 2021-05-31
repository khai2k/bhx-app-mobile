import { apiBase, METHOD, API_CONST } from '@app/api';

const VOUCHER_GET = 'VOUCHER_GET';
const VOUCHER_ADD = 'VOUCHER_ADD';
const VOUCHER_DELETE = 'VOUCHER_DELETE';
const DATA_LOADING = 'DATA_LOADING';
const DATA_LOADED = 'DATA_LOADED';

export const voucherAction = {
    VOUCHER_GET,
    VOUCHER_ADD,
    VOUCHER_DELETE,
    DATA_LOADING,
    DATA_LOADED
};

export const voucher_add = function (
    phoneInput,
    voucherCodeInput,
    pinCodeInput
) {
    return (dispatch) => {
        dispatch({ type: DATA_LOADING });
        return new Promise(async (resolve, reject) => {
            const bodyApi = {
                Code: voucherCodeInput,
                PingCode: pinCodeInput,
                PhoneNumber: phoneInput,
                ProvinceId: 3,
                DistrictId: 2087,
                WardId: 27125,
                StoreId: 6463,
                CartId: '93E9D79154B163C26FAA21C8E150B1289D4A1174E5E82DFA3A6E9E2994437430'
            };
            apiBase(API_CONST.API_REQUEST_ADD_VOUCHER, METHOD.POST, bodyApi)
                .then((response) => {
                    const voucherInfo = response;
                    console.log('voucher_add data:', response);
                    dispatch({
                        type: VOUCHER_ADD,
                        voucherInfo
                    });
                    resolve(response);
                    dispatch({ type: DATA_LOADED });
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};

export const voucher_get = function () {
    return (dispatch) => {
        dispatch({ type: DATA_LOADING });
        return new Promise(async (resolve, reject) => {
            const bodyApi = {
                PhoneNumber: '',
                ProvinceId: 3,
                DistrictId: 2087,
                WardId: 27125,
                StoreId: 6463,
                CartId: '93E9D79154B163C26FAA21C8E150B1289D4A1174E5E82DFA3A6E9E2994437430'
            };
            apiBase(API_CONST.API_REQUEST_GET_VOUCHER, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('voucher_get data:', response);
                    const vouchersInfo = response;
                    dispatch({
                        type: VOUCHER_GET,
                        vouchersInfo
                    });
                    resolve(response);
                    dispatch({ type: DATA_LOADED });
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};

export const voucher_delete = function (code, giftType) {
    console.log(code, giftType);
    return (dispatch) => {
        dispatch({ type: DATA_LOADING });
        return new Promise(async (resolve, reject) => {
            const bodyApi = {
                token: '',
                us: '',
                provinceId: 3,
                districtId: 2087,
                wardId: 27125,
                storeId: 6463,
                data: {
                    Code: code,
                    GiftType: giftType,
                    CartId: '93E9D79154B163C26FAA21C8E150B1289D4A1174E5E82DFA3A6E9E2994437430'
                },
                IsMobile: true
            };
            apiBase(API_CONST.API_REQUEST_DELETE_VOUCHER, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('voucher_delete data:', response);
                    const vouchersInfo = response;
                    dispatch({
                        type: VOUCHER_DELETE,
                        vouchersInfo
                    });
                    resolve(response);
                    dispatch({ type: DATA_LOADED });
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};
