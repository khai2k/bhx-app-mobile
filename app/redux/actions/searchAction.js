import { apiBase, METHOD, API_CONST } from '@app/api';

const SEARCH_GET = 'SEARCH_GET';
const SEARCH_FILTER = 'SEARCH_FILTER';
const SELECT_BRAND = 'SELECT_BRAND';
const SELECT_PROPERTY = 'SELECT_PROPERTY';
const SELECT_SORT = 'SELECT_SORT';

export const searchAction = {
    SEARCH_GET,
    SEARCH_FILTER,
    SELECT_BRAND,
    SELECT_PROPERTY,
    SELECT_SORT
};

export const search_get = function (body) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            apiBase(API_CONST.API_SEARCH_GET, METHOD.POST, body)
                .then((response) => {
                    console.log('SEARCH_GET Data:', response);
                    if (response.HttpCode !== 200) {
                        resolve(response);
                    } else {
                        const searchInfo = response;
                        dispatch({
                            type: SEARCH_GET,
                            searchInfo
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
export const search_filter = (
    key,
    totalRecord,
    selectedBrandId = 0,
    propertyId = 0,
    sort = 0,
    filter = 0,
    pageIndex = 0,
    pageSize = 12,
    IsCheckPromo = 'false'
) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const location = getState().locationReducer;
            const bodyApi = {
                OriginalKey: key,
                Key: key,
                CategoryId: propertyId,
                ManufactureID: selectedBrandId,
                PageSize: pageSize,
                PageIndex: pageIndex,
                TotalRecord: totalRecord,
                QuerySort: sort,
                QueryFilter: filter,
                provinceId: location.crrLocationRs.ProvinceId,
                storeId: location.crrLocationRs.StoreId,
                IsCheckPromo
            };
            apiBase(API_CONST.API_SEARCH_AJAXPRODUCT, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('API_SEARCH_AJAXPRODUCT Data:', response);
                    const searchInfo = response;
                    dispatch({
                        type: SEARCH_FILTER,
                        searchInfo
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
