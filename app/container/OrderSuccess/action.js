import { apiBase, METHOD, API_CONST } from '@app/api';

const ORDER_SUCCESS_GET = 'ORDER_SUCCESS_GET';

export const orderSuccessAction = {
    ORDER_SUCCESS_GET
};

export const orderSuccess_get = function () {
    return (dispatch, getSate) => {
        const bodyApi = {
            // token: getSate().cartReducer.Cart.CartId,
            provinceId: 3,
            districtId: 2087,
            wardId: 27125,
            storeId: 6463,
            orderId: 26068531,
            sc: 'A1BF50D1DB6874A4ADBF4834773F15B5',
            data: {
                cartId: getSate().cartReducer.Cart.CartId
            }
        };
        apiBase(API_CONST.API_REQUEST_GET_ODER_SUCCESS, METHOD.GET, bodyApi)
            .then((response) => {
                console.log('Data:', response);
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
