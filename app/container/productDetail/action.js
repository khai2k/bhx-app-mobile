// import { apiBase, METHOD, API_CONST } from '@app/api';
import { apiBase, METHOD, API_CONST } from '../../api';

const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
const GET_PRODUCT_RELATIVE = 'GET_PRODUCT_RELATIVE';
const GET_COMBO_DETAIL = 'GET_COMBO_DETAIL';
const GET_BOX_BANNER = 'GET_BOX_BANNER';
const GET_GALLERY_PRODUCT = 'GET_GALLERY_PRODUCT';

export const productDetailAction = {
    GET_PRODUCT_DETAIL,
    GET_PRODUCT_RELATIVE,
    GET_COMBO_DETAIL,
    GET_BOX_BANNER,
    GET_GALLERY_PRODUCT
};
export const get_gallery_product = function () {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                productId: 83581,
                provinceId: 3,
                storeId: 6463,
                isMobile: true,
                clearcache: ''
            };
            apiBase(
                'https://staging.bachhoaxanh.com/apiapp/api/product/GalleryProduct?productId=176453&provinceId=3&storeId=6463&phone=0328131471&isMobile=true&clearcache=%22%22',
                METHOD.GET,
                {}
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
export const get_product_detail = function () {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                productId: 83581,
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
export const get_product_relative = function () {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                productId: 83581,
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

export const get_combo_detail = function () {
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

export const get_box_banner = function () {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                productId: 226339,
                provinceId: 3,
                storeId: 6463,
                isMobile: true,
                clearcache: ''
            };
            apiBase(
                'https://staging.bachhoaxanh.com/apiapp/api/product/BoxBanner?productId=226339&provinceId=3&storeId=6463&isMobile=true&clearcache=%22%22',
                METHOD.GET,
                {}
            )
                .then((response) => {
                    const data = response.Value;

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
