import { apiBase, METHOD, API_CONST } from '@app/api';

const GET_LIST_CATEGORIES = 'GET_LIST_CATEGORIES';
const GET_LIST_PRODUCT = 'GET_LIST_PRODUCT';

export const homeAction = {
    GET_LIST_CATEGORIES,
    GET_LIST_PRODUCT
};

export const get_listcategories = function () {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                phone: '',
                isMobile: true,
                storeId: 6463,
                clearcache: ''
            };
            apiBase(
                API_CONST.GET_LIST_CATEGORIES,
                METHOD.GET,
                {},
                { params: bodyApi }
            )
                .then((response) => {
                    console.log('GET_LIST_CATEGORIES Data:', response);
                    const listCategories = response.Value;
                    dispatch({
                        type: GET_LIST_CATEGORIES,
                        listCategories
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

export const get_listproducts = function () {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                provinceId: 3,
                storeId: 6463,
                userId: 0,
                phone: '',
                clearcache: 'null',
                IsMobile: true
            };
            apiBase(
                API_CONST.GET_LIST_PRODUCT,
                METHOD.GET,
                {},
                { params: bodyApi }
            )
                .then((response) => {
                    console.log('GET_LIST_PRODUCT Data:', response);
                    const homeData = response.Value;
                    dispatch({
                        type: GET_LIST_PRODUCT,
                        homeData
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
