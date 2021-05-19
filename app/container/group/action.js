import { apiBase, METHOD, API_CONST } from '@app/api';

const CATEGORY_GET = 'CATEGORY_GET';
const CATEGORY_FILTER = 'CATEGORY_FILTER';
const SELECT_BRAND = 'SELECT_BRAND';
const SELECT_PROPERTY = 'SELECT_PROPERTY';
const SELECT_SORT = 'SELECT_SORT';

export const categoryAction = {
    CATEGORY_GET,
    CATEGORY_FILTER,
    SELECT_BRAND,
    SELECT_PROPERTY,
    SELECT_SORT
};

export const category_get = function (option) {
    return (dispatch, getState) => {
        apiBase(API_CONST.API_CATEGORY_GET, METHOD.GET, null, option)
            .then((response) => {
                console.log('CATEGORY_GET Data:', response);
                const categoryInfo = response.Value;
                dispatch({
                    type: CATEGORY_GET,
                    categoryInfo
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
export const category_filter = (
    categoryId,
    selectedBrandId = 0,
    propertyIdList = '',
    sort = 0,
    pageIndex = 0,
    pageSize = 12,
    phone = 0,
    cateListFilter = '',
    provinceId = 0,
    storeId = 0,
    isLoadVideo = 'false',
    isPromotion = 'false'
) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                provinceId,
                storeId,
                data: {
                    categoryId,
                    selectedBrandId,
                    phone,
                    cateListFilter,
                    propertyIdList,
                    pageIndex,
                    pageSize,
                    isLoadVideo,
                    isPromotion,
                    sort
                }
            };
            apiBase(API_CONST.API_CATEGORY_AJAX_PRODUCT, METHOD.POST, bodyApi)
                .then((response) => {
                    // console.log('API_CATEGORY_AJAX_PRODUCT Data:', response);
                    const categoryInfo = response.Value;
                    dispatch({
                        type: CATEGORY_FILTER,
                        categoryInfo
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
export const select_brand = (selectedBrandId) => {
    return (dispatch, getState) => {
        dispatch({
            type: SELECT_BRAND,
            selectedBrandId
        });
    };
};
export const select_property = (propertyIdList) => {
    return (dispatch, getState) => {
        dispatch({
            type: SELECT_PROPERTY,
            propertyIdList
        });
    };
};
export const select_sort = (sortId) => {
    return (dispatch, getState) => {
        dispatch({
            type: SELECT_SORT,
            sortId
        });
    };
};
