import { apiBase, METHOD, API_CONST } from '@app/api';
import { Storage } from '@app/common';
import { CONST_STORAGE } from '@app/constants';

const CART_GET = 'CART_GET';
const CART_GET_SIMPLE = 'CART_GET_SIMPLE';
const CART_REMOVE_ITEM_PRODUCT = 'CART_REMOVE_ITEM_PRODUCT';
const CART_UPDATE_ITEM_PRODUCT = 'CART_UPDATE_ITEM_PRODUCT';
const CART_ADD_ITEM_PRODUCT = 'CART_ADD_ITEM_PRODUCT';

export const cartAction = {
    CART_GET,
    CART_GET_SIMPLE,
    CART_REMOVE_ITEM_PRODUCT,
    CART_ADD_ITEM_PRODUCT,
    CART_UPDATE_ITEM_PRODUCT
};

export const cart_get = function () {
    return (dispatch, getSate) => {
        return new Promise(async (resolve, reject) => {
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: 3,
                districtId: 22,
                wardId: 10194,
                storeId: 7003,
                data: {
                    cartId
                }
            };
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
    return (dispatch, getSate) => {
        return new Promise(async (resolve, reject) => {
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);

            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: 3,
                districtId: 22,
                wardId: 10194,
                storeId: 7003,
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
    return (dispatch, getSate) => {
        return new Promise(async (resolve, reject) => {
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: 3,
                districtId: 22,
                wardId: 10194,
                storeId: 7003,
                data: {
                    cartId,
                    guid: guildId,
                    reloadShiping: true,
                    isSubmitOrder: true
                }
            };
            apiBase(API_CONST.API_REQUEST_REMOVE_CART, METHOD.POST, bodyApi)
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

export const cart_add_item_product = function (prodId, quantityNum) {
    return (dispatch, getSate) => {
        return new Promise(async (resolve, reject) => {
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);

            const bodyApi = {
                token: cartId,
                us: '',
                // provinceId: 3,
                // districtId: 0,
                // wardId: 0,
                // storeId: 6463,
                provinceId: 3,
                districtId: 22,
                wardId: 10194,
                storeId: 7003,
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
    return (dispatch, getSate) => {
        return new Promise(async (resolve, reject) => {
            // get cart simple from storage
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: 3,
                districtId: 22,
                wardId: 10194,
                storeId: 7003,
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
