import { apiBase, METHOD, API_CONST } from '@app/api';

const ORDER_SUCCESS_GET = 'ORDER_SUCCESS_GET';
const ORDER_SUCCESS_DELETE = 'ORDER_SUCCESS_DELETE';

export const orderSuccessAction = {
    ORDER_SUCCESS_GET,
    ORDER_SUCCESS_DELETE
};

const key = 'E5346AA38792A';

let phone;
let tokenCancel;
let cartId;
let orderIdCancel;

export const orderSuccess_get = function (orderId) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const location = getState().locationReducer.Location.LocationInfo;
            debugger;
            const bodyApi = {
                ProvinceId: location.provinceId,
                DistrictId: location.DistrictId,
                WardId: location.WardId,
                StoreId: location.StoreId,
                Sc: '',
                //  OrderId: 43652170,
                OrderId: orderId,
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
                    orderIdCancel = orderInfo.OrderId;
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
                    orderid: orderIdCancel,
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
