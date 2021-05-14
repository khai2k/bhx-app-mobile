import { apiBase, METHOD } from '@app/api';
import { API_CONST } from '@app/constants';

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
            provinceId: 3,
            districtId: 0,
            wardId: 0,
            storeId: 6463,
            data: {
                cartId: getSate().cartReducer.Cart.CartId
            }
        };
        apiBase(API_CONST.API_REQUEST_GET_CART, METHOD.POST, bodyApi)
            .then((response) => {
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
        const bodyApi = {
            token: getSate().cartReducer.Cart.CartId,
            us: '',
            provinceId: 3,
            districtId: 0,
            wardId: 0,
            storeId: 6463,
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
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const cart_add_item_product = function (prodId, quantityNum) {
    return (dispatch, getSate) => {
        const bodyApi = {
            token: getSate().cartReducer.Cart.CartId,
            us: '',
            provinceId: 3,
            districtId: 0,
            wardId: 0,
            storeId: 6463,
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
            })
            .catch((error) => {
                console.log(error);
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
