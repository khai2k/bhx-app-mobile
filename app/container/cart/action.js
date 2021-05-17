import { apiBase, METHOD, API_CONST } from '@app/api';

const CART_GET = 'CART_GET';
const CART_REMOVE_ITEM_PRODUCT = 'CART_REMOVE_ITEM_PRODUCT';
const CART_ADD_ITEM_PRODUCT = 'CART_ADD_ITEM_PRODUCT';

export const cartAction = {
    CART_GET,
    CART_REMOVE_ITEM_PRODUCT,
    CART_ADD_ITEM_PRODUCT
};

export const cart_get = function () {
    return (dispatch, getSate) => {
        const bodyApi = {
            token: getSate().cartReducer.Cart.CartId,
            us: '',
            provinceId: 8,
            districtId: 723,
            wardId: 11544,
            storeId: 5771,
            data: {
                cartId: getSate().cartReducer.Cart.CartId
            }
        };
        apiBase(API_CONST.API_REQUEST_GET_CART, METHOD.POST, bodyApi)
            .then((response) => {
                console.log('CART_REMOVE_ITEM_PRODUCT Data:', response);
                const cartInfo = response.Value;
                dispatch({
                    type: CART_GET,
                    cartInfo
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const cart_remove_item_product = function (guildId = '') {
    return (dispatch, getSate) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                token: getSate().cartReducer.Cart.CartId,
                us: '',
                provinceId: 8,
                districtId: 723,
                wardId: 11544,
                storeId: 5771,
                data: {
                    cartId: getSate().cartReducer.Cart.CartId,
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
        return new Promise((resolve, reject) => {
            const bodyApi = {
                token: getSate().cartReducer.Cart.CartId,
                us: '',
                // provinceId: 3,
                // districtId: 0,
                // wardId: 0,
                // storeId: 6463,
                provinceId: 8,
                districtId: 723,
                wardId: 11544,
                storeId: 5771,
                data: {
                    cartId: getSate().cartReducer.Cart.CartId,
                    productId: prodId,
                    quantity: quantityNum,
                    increase: true,
                    isUpdate: true,
                    promoCode: '',
                    isInCartSite: true
                }
            };
            apiBase(API_CONST.API_REQUEST_REMOVE_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('CART_REMOVE_ITEM_PRODUCT Data:', response);
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

// action.js
// export const getDataCart = function (data) {
//     return (dispatch, getState) => {
//         return new Promise((resolve, reject) => {
//             const body = {
//                 data
//             };
//             // call dispatch
//             apiBase(API_GET_DATA_CART, METHOD.POST, body)
//                 .then((response) => {
//                     // call dispatch
//                     resolve(response);
//                 })
//                 .catch((error) => {
//                     // call dispatch
//                     reject(error);
//                 });
//         });
//     };
// };

// // index.js
// const actionCart = bindActionCreators(cartCreator, dispatch);

// actionCart
//     .getDataShoppingCart(data)
//     .then((response) => {
//         // todo
//     })
//     .catch((error) => {
//         // popup error
//     });
