import { apiBase, METHOD, API_CONST } from '@app/api';
import { Storage, helper } from '@app/common';
import { CONST_STORAGE } from '@app/constants';

const CART_GET = 'CART_GET';
const CART_GET_FULL = 'CART_GET_FULL';
const CART_GET_SIMPLE = 'CART_GET_SIMPLE';
const CART_REMOVE_ITEM_PRODUCT = 'CART_REMOVE_ITEM_PRODUCT';
const CART_UPDATE_ITEM_PRODUCT = 'CART_UPDATE_ITEM_PRODUCT';
const CART_ADD_ITEM_PRODUCT = 'CART_ADD_ITEM_PRODUCT';
const CART_REMOVE = 'CART_REMOVE';
const CART_SUBMIT = 'CART_SUBMIT';

export const cartAction = {
    CART_GET,
    CART_GET_FULL,
    CART_GET_SIMPLE,
    CART_REMOVE_ITEM_PRODUCT,
    CART_ADD_ITEM_PRODUCT,
    CART_UPDATE_ITEM_PRODUCT,
    CART_REMOVE,
    CART_SUBMIT
};

export const cart_get = function () {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            // consoleconst cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const cartId =
                'B9B2B8323256D8EFE9AC17C54C0BDCB083043C0DD6EAADB449CA8DEBB91C342A';
            const location = getState().locationReducer;
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: 3,
                districtId: 2087,
                wardId: 27125,
                storeId: 6463,
                data: {
                    cartId
                }
            };
            // const bodyApi = {
            //     token: cartId,
            //     us: '',
            //     provinceId: location.crrLocationRs.ProvinceId,
            //     districtId: location.crrLocationRs.DistrictId,
            //     wardId: location.crrLocationRs.WardId,
            //     storeId: location.crrLocationRs.StoreId,
            //     data: {
            //         cartId
            //     }
            // };
            apiBase(API_CONST.API_REQUEST_GET_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('CART_GET Data:', response);
                    const cartInfo = response.Value;
                    dispatch({
                        type: CART_GET,
                        cartInfo
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};
export const cart_get_full = function () {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            // consoleconst cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const cartId =
                'B9B2B8323256D8EFE9AC17C54C0BDCB083043C0DD6EAADB449CA8DEBB91C342A';
            const location = getState().locationReducer;
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: 3,
                districtId: 2087,
                wardId: 27125,
                storeId: 6463,
                data: {
                    cartId
                }
            };
            // const bodyApi = {
            //     token: cartId,
            //     us: '',
            //     provinceId: location.crrLocationRs.ProvinceId,
            //     districtId: location.crrLocationRs.DistrictId,
            //     wardId: location.crrLocationRs.WardId,
            //     storeId: location.crrLocationRs.StoreId,
            //     data: {
            //         cartId
            //     }
            // };
            apiBase(API_CONST.API_REQUEST_GET_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    debugger;
                    console.log('CART_GET_FULLLL Data:', response);
                    const cartInfo = response.Value;
                    dispatch({
                        type: CART_GET_FULL,
                        cartInfo
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};
export const cart_submit = function (Cart) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            // consoleconst cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const cartId =
                'B9B2B8323256D8EFE9AC17C54C0BDCB083043C0DD6EAADB449CA8DEBB91C342A';
            const location = getState().locationReducer;
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: 3,
                districtId: 2087,
                wardId: 27125,
                storeId: 6463,
                data: {
                    Cart
                }
            };
            apiBase(API_CONST.API_REQUEST_SUBMIT_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('CART_SUBMIT Data:', response);
                    const cartInfo = response.Value;
                    dispatch({
                        type: CART_SUBMIT,
                        cartInfo
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};
export const cart_update_item_product = function (guildId, iQuantity) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const location = getState().locationReducer;
            console.log(location);
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: location.crrLocationRs.ProvinceId,
                districtId: location.crrLocationRs.DistrictId,
                wardId: location.crrLocationRs.WardId,
                storeId: location.crrLocationRs.StoreId,
                data: {
                    cartId,
                    guid: guildId,
                    reloadShiping: true,
                    isSubmtypeitOrder: true,
                    quantity: iQuantity,
                    type: true
                }
            };
            apiBase(API_CONST.API_REQUEST_UPDATE_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('CART_UPDATE_ITEM_PRODUCT Data:', response);
                    const cartInfo = { ...response.Value };
                    dispatch({
                        type: CART_UPDATE_ITEM_PRODUCT,
                        cartInfo
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};

export const cart_remove_item_product = function (guildId) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const location = getState().locationReducer;

            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: location.crrLocationRs.ProvinceId,
                districtId: location.crrLocationRs.DistrictId,
                wardId: location.crrLocationRs.WardId,
                storeId: location.crrLocationRs.StoreId,
                data: {
                    cartId,
                    guid: guildId,
                    reloadShiping: true,
                    isSubmitOrder: true
                }
            };
            apiBase(
                API_CONST.API_REQUEST_REMOVE_ITEM_CART,
                METHOD.POST,
                bodyApi
            )
                .then((response) => {
                    console.log('CART_REMOVE_ITEM_PRODUCT Data:', response);
                    const cartInfo = response.Value;
                    dispatch({
                        type: CART_REMOVE_ITEM_PRODUCT,
                        cartInfo
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};

export const cart_remove = function () {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const location = getState().locationReducer;
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: location.crrLocationRs.ProvinceId,
                districtId: location.crrLocationRs.DistrictId,
                wardId: location.crrLocationRs.WardId,
                storeId: location.crrLocationRs.StoreId,
                data: {
                    cartId,
                    isClearAllCoolProduct: true
                }
            };
            apiBase(API_CONST.API_REQUEST_REMOVE_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('CART_REMOVE Data:', response);
                    const rmCartId = response.Value;
                    Storage.setItem(CONST_STORAGE.CARTID, rmCartId);
                    dispatch({
                        type: CART_REMOVE,
                        rmCartId
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};

export const cart_add_item_product = function (
    prodId,
    quantityNum,
    expStoreId
) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const location = getState().locationReducer;

            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: !helper.isEmptyOrNull(location)
                    ? location.crrLocationRs.ProvinceId
                    : 3,
                districtId: !helper.isEmptyOrNull(location)
                    ? location.crrLocationRs.DistrictId
                    : 0,
                wardId: !helper.isEmptyOrNull(location)
                    ? location.crrLocationRs.WardId
                    : 0,
                storeId:
                    expStoreId > 0
                        ? expStoreId
                        : !helper.isEmptyOrNull(location)
                        ? location.crrLocationRs.StoreId
                        : 6815,
                data: {
                    cartId,
                    productId: prodId,
                    quantity: quantityNum,
                    increase: true,
                    isUpdate: true,
                    promoCode: '',
                    isInCartSite: true
                }
            };
            apiBase(API_CONST.API_REQUEST_ADD_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('CART_ADD_ITEM_PRODUCT Data:', response);
                    const cartInfo = response.Value;
                    dispatch({
                        type: CART_ADD_ITEM_PRODUCT,
                        cartInfo
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};

export const cart_get_simple = function () {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            // get cart simple from storage
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const location = getState().locationReducer;

            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: !helper.isEmptyOrNull(location)
                    ? location.crrLocationRs.ProvinceId
                    : 3,
                districtId: !helper.isEmptyOrNull(location)
                    ? location.crrLocationRs.DistrictId
                    : 0,
                wardId: !helper.isEmptyOrNull(location)
                    ? location.crrLocationRs.WardId
                    : 0,
                storeId: !helper.isEmptyOrNull(location)
                    ? location.crrLocationRs.StoreId
                    : 6815,
                data: {
                    cartId
                }
            };
            apiBase(API_CONST.API_REQUEST_GET_SIMPLE_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('API_REQUEST_GET_SIMPLE_CART Data:', response);
                    const cartInfo = response.Value;
                    dispatch({
                        type: CART_GET_SIMPLE,
                        cartInfo
                    });
                    if (cartInfo.CartId !== '') {
                        Storage.setItem(CONST_STORAGE.CARTID, cartInfo.CartId);
                    }

                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };
};

//  Thử loại async/await đều ngon lành
// export const get_cart = function () {
//     return async (dispatch, getSate) => {
//         const bodyApi = {
//             token: getSate().cartReducer.Cart.CartId,
//             us: '',
//             provinceId: 3,
//             districtId: 0,
//             wardId: 0,
//             storeId: 6463,
//             data: {
//                 cartId: getSate().cartReducer.Cart.CartId
//             }
//         };
//         const response = await apiBase(
//             API_CONST.API_REQUEST_GET_CART,
//             METHOD.POST,
//             bodyApi,
//             {
//                 isCustomToken: false,
//                 isOauthenToken: false,
//                 isUpload: false
//             }
//         );
//         const cartInfo = response.Value;
//         console.log('response api Nhu test:', cartInfo);
//         dispatch({
//             type: GET_CART,
//             cartInfo
//         });
//     };
// };
