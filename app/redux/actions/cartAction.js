import { apiBase, METHOD, API_CONST } from '@app/api';
import { Storage, helper } from '@app/common';
import { CONST_STORAGE } from '@app/constants';
import MD5 from 'md5';

const CART_GET = 'CART_GET';
const CART_LISTCATE_TOP = 'CART_LISTCATE_TOP';
const CART_GET_SIMPLE = 'CART_GET_SIMPLE';
const CART_SUBMIT = 'CART_SUBMIT';
const CART_REMOVE_ITEM_PRODUCT = 'CART_REMOVE_ITEM_PRODUCT';
const CART_UPDATE_ITEM_PRODUCT = 'CART_UPDATE_ITEM_PRODUCT';
const CART_ADD_ITEM_PRODUCT = 'CART_ADD_ITEM_PRODUCT';
const CART_REMOVE = 'CART_REMOVE';

export const cartAction = {
    CART_GET,
    CART_LISTCATE_TOP,
    CART_GET_SIMPLE,
    CART_SUBMIT,
    CART_REMOVE_ITEM_PRODUCT,
    CART_ADD_ITEM_PRODUCT,
    CART_UPDATE_ITEM_PRODUCT,
    CART_REMOVE
};

export const cart_get = function (prov, dis, ward) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const location = getState().locationReducer.Location.LocationInfo;
            const cartId = getState().generalReducer.CartId;
            // const cartId =
            //     'B9B2B8323256D8EFE9AC17C54C0BDCB083043C0DD6EAADB449CA8DEBB91C342A';
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: prov > 0 ? prov : location.ProvinceId,
                districtId: dis > 0 ? dis : location.DistrictId,
                wardId: ward > 0 ? ward : location.WardId,
                storeId: location.StoreId,
                data: {
                    cartId
                }
            };
            apiBase(API_CONST.API_REQUEST_GET_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('CART_GET Data:', response);
                    if (
                        response.OtherData != null &&
                        response.OtherData.IsEmptyCart === true
                    ) {
                        dispatch({
                            type: CART_LISTCATE_TOP,
                            ListCategory:
                                response.OtherData.ListSuggestCategorys
                        });
                    }
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

export const cart_submit = function (Cart) {
    Cart.ValidateToken = MD5(`${Cart.CartId}bhx@123`);
    Cart.IsAdding = false;
    Cart.IsEditing = false;
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const location = getState().locationReducer.Location.LocationInfo;
            const cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            // const cartId =
            //     'B9B2B8323256D8EFE9AC17C54C0BDCB083043C0DD6EAADB449CA8DEBB91C342A';
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: Cart.Cart.ShipProvince,
                districtId: Cart.Cart.ShipDistrict,
                wardId: Cart.Cart.ShipWard,
                storeId: location.StoreId,
                data: Cart
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
        return new Promise((resolve, reject) => {
            const cartId = getState().generalReducer.CartId;
            const location = getState().locationReducer.Location.LocationInfo;
            console.log(location);
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: location.ProvinceId,
                districtId: location.DistrictId,
                wardId: location.WardId,
                storeId: location.StoreId,
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
                    const cartInfo = { ...response.Value };
                    dispatch({
                        type: CART_UPDATE_ITEM_PRODUCT,
                        cartInfo
                    });
                    dispatch(cart_get_simple());
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
        return new Promise((resolve, reject) => {
            const cartId = getState().generalReducer.CartId;
            const location = getState().locationReducer.Location.LocationInfo;

            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: location.ProvinceId,
                districtId: location.DistrictId,
                wardId: location.WardId,
                storeId: location.StoreId,
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
                    dispatch(cart_get_simple());
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
        return new Promise((resolve, reject) => {
            const cartId = getState().generalReducer.CartId;
            const location = getState().locationReducer.Location.LocationInfo;
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: location.ProvinceId,
                districtId: location.DistrictId,
                wardId: location.WardId,
                storeId: location.StoreId,
                data: {
                    cartId,
                    isClearAllCoolProduct: false
                }
            };
            apiBase(API_CONST.API_REQUEST_REMOVE_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    const cartInfo = response.Value;
                    Storage.setItem(CONST_STORAGE.CARTID, cartInfo.Cart.CartId);
                    dispatch({
                        type: 'GENERAL_SET_CARTID',
                        cartId: cartInfo.Cart.CartId
                    });
                    dispatch({
                        type: CART_REMOVE,
                        cartInfo
                    });
                    dispatch(cart_get_simple());
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
        return new Promise((resolve, reject) => {
            const cartId = getState().generalReducer.CartId;
            const location = getState().locationReducer.Location.LocationInfo;
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: !helper.isEmptyOrNull(location)
                    ? location.ProvinceId
                    : 3,
                districtId: !helper.isEmptyOrNull(location)
                    ? location.DistrictId
                    : 0,
                wardId: !helper.isEmptyOrNull(location) ? location.WardId : 0,
                storeId:
                    expStoreId > 0
                        ? expStoreId
                        : !helper.isEmptyOrNull(location) &&
                          !helper.isEmptyOrNull(location) &&
                          !helper.isEmptyOrNull(location.StoreId)
                        ? location.StoreId
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
            console.log(bodyApi);
            apiBase(API_CONST.API_REQUEST_ADD_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('CART_ADD_ITEM_PRODUCT Data:', response);
                    if (response.ResultCode > 0) {
                        resolve(response);
                    } else {
                        const cartInfo = response.Value;
                        dispatch({
                            type: CART_ADD_ITEM_PRODUCT,
                            cartInfo
                        });
                        resolve(response);
                    }
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
            let cartId = getState().generalReducer.CartId;
            if (helper.isEmptyOrNull(cartId)) {
                cartId = await Storage.getItem(CONST_STORAGE.CARTID);
            }
            const location = getState().locationReducer.Location.LocationInfo;
            const bodyApi = {
                token: cartId,
                us: '',
                provinceId: location.ProvinceId,
                districtId: location.DistrictId,
                wardId: location.WardId,
                storeId: location.StoreId,
                data: {
                    cartId
                }
            };
            apiBase(API_CONST.API_REQUEST_GET_SIMPLE_CART, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('API_REQUEST_GET_SIMPLE_CART Data:', response);
                    const cartInfo = response.Value;
                    if (!helper.isEmptyOrNull(cartInfo.CartId)) {
                        Storage.setItem(CONST_STORAGE.CARTID, cartInfo.CartId);
                        dispatch({
                            type: 'GENERAL_SET_CARTID',
                            cartId: cartInfo.CartId
                        });
                    }
                    dispatch({
                        type: CART_GET_SIMPLE,
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
