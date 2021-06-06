import { apiBase, METHOD, API_CONST } from '@app/api';

const ORDER_SUCCESS_GET = 'ORDER_SUCCESS_GET';
const ORDER_SUCCESS_DELETE = 'ORDER_SUCCESS_DELETE';

export const orderSuccessAction = {
    ORDER_SUCCESS_GET,
    ORDER_SUCCESS_DELETE
};

const key = 'E5346AA38792A';

var phone;
var tokenCancel;
var cartId;
var orderId;

export const orderSuccess_get = function () {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const location = getState().locationReducer.Location.LocationInfo;
            const bodyApi = {
                ProvinceId: location.provinceId,
                DistrictId: location.DistrictId,
                WardId: location.WardId,
                StoreId: location.StoreId,
                Sc: '5CE8F8D0132ECB9A2B60366813E44BD3',
                OrderId: 43652170,
                KeyAppCancel: key
            };
            apiBase(
                API_CONST.API_REQUEST_GET_ORDER_SUCCESS,
                METHOD.POST,
                bodyApi
            )
                .then((response) => {
                    console.log('data', response);
                    const orderInfo = response.Value;
                    phone = orderInfo.Detail.ContactPhone;
                    tokenCancel = orderInfo.TokenCancel;
                    cartId = orderInfo.CartView.Cart.CartId;
                    orderId = orderInfo.OrderId;
                    dispatch({
                        type: ORDER_SUCCESS_GET,
                        orderInfo
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log('err', error);
                    reject(error);
                });
        });
    };
};

export const orderSuccess_cancel = function () {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const location = getState().locationReducer.Location.LocationInfo;
            const bodyApi = {
                token: '',
                us: '',
                ProvinceId: location.provinceId,
                DistrictId: location.DistrictId,
                WardId: location.WardId,
                StoreId: location.StoreId,
                data: {
                    cartid: cartId,
                    orderid: orderId,
                    phonenumber: phone,
                    tokencancel: tokenCancel,
                    keyappcancel: key
                },
                IsMobile: true
            };
            apiBase(
                API_CONST.API_REQUEST_CANCEL_ORDER_SUCCESS,
                METHOD.POST,
                bodyApi
            )
                .then((response) => {
                    console.log('Data:', response);
                    const orderInfo = response.Value;
                    dispatch({
                        type: ORDER_SUCCESS_GET,
                        orderInfo
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log('error', error);
                    reject(error);
                });
        });
    };
};
