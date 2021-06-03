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
    return (dispatch, getState) => {
        dispatch({ type: DATA_LOADING });
        return new Promise(async (resolve, reject) => {
            const location = getState().locationReducer.Location.LocationInfo;
            const cartId = getState().generalReducer.CartId;
            const bodyApi = {
                Code: voucherCodeInput,
                PingCode: pinCodeInput,
                PhoneNumber: phoneInput,
                ProvinceId: location.provinceId,
                DistrictId: location.DistrictId,
                WardId: location.WardId,
                StoreId: location.StoreId,
                CartId: cartId
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
                    dispatch({ type: DATA_LOADED });
                });
        });
    };
};

export const voucher_get = function () {
    return (dispatch, getState) => {
        dispatch({ type: DATA_LOADING });
        return new Promise(async (resolve, reject) => {
            const location = getState().locationReducer.Location.LocationInfo;
            const cartId = getState().generalReducer.CartId;
            const bodyApi = {
                PhoneNumber: '',
                ProvinceId: location.ProvinceId,
                DistrictId: location.DistrictId,
                WardId: location.WardId,
                StoreId: location.StoreId,
                CartId: cartId
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
                    dispatch({ type: DATA_LOADED });
                });
        });
    };
};

export const voucher_delete = function (code, giftType) {
    console.log(code, giftType);
    return (dispatch, getState) => {
        dispatch({ type: DATA_LOADING });
        return new Promise(async (resolve, reject) => {
            const location = getState().locationReducer.Location.LocationInfo;
            const cartId = getState().generalReducer.CartId;
            const bodyApi = {
                token: '',
                us: '',
                ProvinceId: location.ProvinceId,
                DistrictId: location.DistrictId,
                WardId: location.WardId,
                StoreId: location.StoreId,
                data: {
                    Code: code,
                    GiftType: giftType,
                    CartId: cartId
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
                    dispatch({ type: DATA_LOADED });
                });
        });
    };
};
