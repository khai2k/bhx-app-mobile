import { apiBase, METHOD, API_CONST } from '@app/api';
import { Storage, helper } from '@app/common';
import { CONST_STORAGE } from '@app/constants';

const CART_GET = 'CART_GET';
const CART_GET_SIMPLE = 'CART_GET_SIMPLE';
const CART_REMOVE_ITEM_PRODUCT = 'CART_REMOVE_ITEM_PRODUCT';
const CART_UPDATE_ITEM_PRODUCT = 'CART_UPDATE_ITEM_PRODUCT';
const CART_ADD_ITEM_PRODUCT = 'CART_ADD_ITEM_PRODUCT';
const CART_REMOVE = 'CART_REMOVE';

export const cartAction = {
    CART_GET,
    CART_GET_SIMPLE,
    CART_REMOVE_ITEM_PRODUCT,
    CART_ADD_ITEM_PRODUCT,
    CART_UPDATE_ITEM_PRODUCT,
    CART_REMOVE
};

export const cart_get = function () {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            // consoleconst cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const cartId =
                '6E941396616C945AEB5A8EB061E900330076C10B8EA2896F953ACFD4336FFDDD';
            const location = getState().locationReducer;
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: 3,
                districtId: 2087,
                wardId: 27116,
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
    increase,
    expStoreId,
    isUpdate = false
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
                        : !helper.isEmptyOrNull(location) &&
                          !helper.isEmptyOrNull(location.crrLocationRs) &&
                          !helper.isEmptyOrNull(location.crrLocationRs.StoreId)
                        ? location.crrLocationRs.StoreId
                        : 6815,
                data: {
                    cartId,
                    productId: prodId,
                    quantity: quantityNum,
                    increase,
                    isUpdate,
                    promoCode: '',
                    isInCartSite: false
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
