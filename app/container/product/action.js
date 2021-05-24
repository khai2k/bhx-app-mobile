import { apiBase, METHOD, API_CONST } from '@app/api';

const GET_LIST_CATEGORIES = 'GET_LIST_CATEGORIES';
const GET_LIST_PRODUCT = 'GET_LIST_PRODUCT';
const GET_MORE_LIST_PRODUCT = 'GET_MORE_LIST_PRODUCT';
const GET_MORE_LINE = 'GET_MORE_LINE';

export const homeAction = {
    GET_LIST_CATEGORIES,
    GET_LIST_PRODUCT,
    GET_MORE_LIST_PRODUCT,
    GET_MORE_LINE
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

export const get_more_listproducts = function (
    pageIndex,
    categoryIds,
    excludeProductIds
) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            console.log('PageIndex: ', pageIndex);
            console.log('excludeProductIds: ', excludeProductIds);
            console.log('categoryIds: ', categoryIds);
            const bodyApi = {
                token: '',
                us: '',
                provinceId: 3,
                districtId: 0,
                wardId: 0,
                storeId: 6463,
                data: {
                    ListProducts: '',
                    PageIndex: pageIndex,
                    PageSize: 9,
                    Phone: '',
                    CategoryIds: categoryIds,
                    ExcludeProductIds: excludeProductIds,
                    CategoryId: 0,
                    ListCategoryIds: ''
                }
            };
            apiBase(API_CONST.GET_MORE_LIST_PRODUCT, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('GET_MORE_LIST_PRODUCT Data:', response);
                    const loadMoreProducts = { ...response.Value };
                    dispatch({
                        type: GET_MORE_LIST_PRODUCT,
                        loadMoreProducts
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log('GET_MORE_LIST_PRODUCT Error:', error);
                    reject(error);
                });
        });
    };
};
