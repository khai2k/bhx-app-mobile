// import { apiBase, METHOD, API_CONST } from '@app/api';
import { useDispatch } from 'react-redux';
import { apiBase, METHOD, API_CONST } from '../../api';

const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
const GET_PRODUCT_RELATIVE = 'GET_PRODUCT_RELATIVE';
const GET_COMBO_DETAIL = 'GET_COMBO_DETAIL';
const GET_BOX_BANNER = 'GET_BOX_BANNER';
const GET_GALLERY_PRODUCT = 'GET_GALLERY_PRODUCT';
const IS_LOADING = 'IS_LOADING';

export const productDetailAction = {
    GET_PRODUCT_DETAIL,
    GET_PRODUCT_RELATIVE,
    GET_COMBO_DETAIL,
    GET_BOX_BANNER,
    GET_GALLERY_PRODUCT,
    IS_LOADING
};

export const get_gallery_product = function (productId) {
    console.log('get_gallery_product++++++++++++++++');
    console.log(productId);
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                productId,
                provinceId: 3,
                storeId: 6463,
                phone: '0328131471',
                isMobile: true,
                clearcache: ''
            };
            apiBase(
                API_CONST.API_GET_GALLERY_PRODUCT,
                METHOD.GET,
                {},
                { params: bodyApi }
            )
                .then((response) => {
                    const data = response.Value.productGalleriesItem;
                    console.log(data.length, '---------------------------');
                    dispatch({
                        type: GET_GALLERY_PRODUCT,
                        data
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
export const get_product_detail = function (productId) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                productId,
                provinceId: 3,
                storeId: 6463,
                isMobile: true,
                clearcache: ''
            };
            apiBase(
                API_CONST.API_GET_PRODUCT_DETAIL,
                METHOD.GET,
                {},
                { params: bodyApi }
            )
                .then((response) => {
                    const data = response.Value;
                    dispatch({
                        type: GET_PRODUCT_DETAIL,
                        data
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
export const get_product_relative = function (productId) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                productId,
                provinceId: 3,
                storeId: 6463,
                totalSize: 6,
                clearcache: ''
            };
            apiBase(
                API_CONST.API_GET_PRODUCT_RELATIVE,
                METHOD.GET,
                {},
                { params: bodyApi }
            )
                .then((response) => {
                    const data = response.Value;

                    dispatch({
                        type: GET_PRODUCT_RELATIVE,
                        data
                    });
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
};

export const get_combo_detail = function (productId) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                productCode: '79387,85959',
                quantityPromotionId: 2,
                storeId: 6463,
                provinceId: 3,
                clearcache: ''
            };
            apiBase(
                API_CONST.API_GET_COMBO_DETAIL,
                METHOD.GET,
                {},
                { params: bodyApi }
            )
                .then((response) => {
                    const data = response.Value;
                    dispatch({
                        type: GET_COMBO_DETAIL,
                        data
                    });
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
};

export const get_box_banner = function (productId) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                productId,
                provinceId: 3,
                storeId: 6463,
                isMobile: true,
                clearcache: ''
            };
            apiBase(
                API_CONST.API_GET_BOX_BANNER,
                METHOD.GET,
                {},
                { params: bodyApi }
            )
                .then((response) => {
                    const data = response.Value;
                    console.log('api-get_box');
                    dispatch({
                        type: GET_BOX_BANNER,
                        data
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error, 'zzzzzzzzzz');
                    reject(error);
                });
        });
    };
};

export const fetchAll = function (productId) {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING, data: true });
        await Promise.all([
            dispatch(get_gallery_product(productId)),
            dispatch(get_product_detail(productId)),
            dispatch(get_product_relative(productId)),
            dispatch(get_combo_detail(productId)),
            dispatch(get_box_banner(productId))
        ]);
        dispatch({ type: IS_LOADING, data: false });
    };
};
