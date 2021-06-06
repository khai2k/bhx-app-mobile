import { apiBase, METHOD, API_CONST } from '@app/api';

const GET_LIST_CATEGORIES = 'GET_LIST_CATEGORIES';
const GET_CATE_LINES = 'GET_CATE_LINES';
const GET_HOME_DATA = 'GET_HOME_DATA';
const LOAD_MORE_HOME_DATA = 'LOAD_MORE_HOME_DATA';
const LOAD_MORE_PRODUCTS = 'LOAD_MORE_PRODUCTS';
const GET_MORE_LINE = 'GET_MORE_LINE';
const GET_FRESH_PRODUCTS = 'GET_FRESH_PRODUCTS';

export const homeAction = {
    GET_LIST_CATEGORIES,
    GET_CATE_LINES,
    GET_HOME_DATA,
    LOAD_MORE_HOME_DATA,
    LOAD_MORE_PRODUCTS,
    GET_MORE_LINE,
    GET_FRESH_PRODUCTS
};

export const getListCategories = () => {
    return (dispatch, getState) => {
        const location = getState().locationReducer.Location.LocationInfo;
        return new Promise((resolve, reject) => {
            const bodyApi = {
                phone: '',
                isMobile: true,
                storeId: location.StoreId,
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
                    if (response.ResultCode > 0) {
                        reject(response);
                    } else {
                        const listCategories = response.Value;
                        dispatch({
                            type: GET_LIST_CATEGORIES,
                            listCategories
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

export const getCateLines = () => {
    return (dispatch, getState) => {
        const location = getState().locationReducer.Location.LocationInfo;
        return new Promise((resolve, reject) => {
            const bodyApi = {
                phone: '',
                provinceId: location.ProvinceId,
                storeId: location.StoreId,
                clearcache: ''
            };
            apiBase(
                API_CONST.GET_CATE_LINES,
                METHOD.GET,
                {},
                { params: bodyApi }
            )
                .then((response) => {
                    console.log('GET_CATE_LINES Data:', response);
                    if (response.ResultCode > 0) {
                        reject(response);
                    } else {
                        const cateLines = response.Value;
                        dispatch({
                            type: GET_CATE_LINES,
                            cateLines
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

export const getHomeData = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const location = getState().locationReducer?.Location.LocationInfo;
            const bodyApi = {
                provinceId: location.ProvinceId,
                storeId: location.StoreId,
                userId: 0,
                phone: '',
                clearcache: 'null',
                IsMobile: true
            };
            apiBase(
                API_CONST.GET_HOME_DATA,
                METHOD.GET,
                {},
                { params: bodyApi }
            )
                .then((response) => {
                    console.log('GET_HOME_DATA Data:', response);
                    if (response.ResultCode > 0) {
                        reject(response);
                    } else {
                        const homeData = response;
                        dispatch({
                            type: GET_HOME_DATA,
                            homeData
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

export const loadMoreHomeData = (pageIndex) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const location = getState().locationReducer?.Location.LocationInfo;
            const bodyApi = {
                pageIndex,
                pageSize: 3,
                provinceId: location.ProvinceId,
                storeId: location.StoreId,
                isMobile: true,
                phone: '',
                maxPage: getState().homeReducer.MaxPage,
                clearcache: ''
            };
            apiBase(
                API_CONST.LOAD_MORE_HOME_DATA,
                METHOD.GET,
                {},
                { params: bodyApi }
            )
                .then((response) => {
                    console.log('LOAD_MORE_HOME_DATA Data:', response);
                    if (response.ResultCode > 0) {
                        reject(response);
                    } else {
                        const homeData = { ...response, pageIndex };
                        dispatch({
                            type: LOAD_MORE_HOME_DATA,
                            homeData
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

export const loadMoreProducts = (
    pageIndex,
    categoryIds,
    excludeProductIds,
    groupId
) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const location = getState().locationReducer.Location.LocationInfo;
            const bodyApi = {
                token: '',
                us: '',
                provinceId: location.ProvinceId,
                districtId: 0,
                wardId: 0,
                storeId: location.StoreId,
                data: {
                    ListProducts: '',
                    PageIndex: pageIndex,
                    PageSize: 9,
                    Phone: '',
                    CategoryIds: categoryIds,
                    ExcludeProductIds: excludeProductIds,
                    CategoryId: groupId,
                    ListCategoryIds: ''
                },
                IsMobile: true
            };
            apiBase(API_CONST.LOAD_MORE_PRODUCTS, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('LOAD_MORE_PRODUCTS Data:', response);
                    const dataLoadMore = { groupId, ...response };
                    dispatch({
                        type: LOAD_MORE_PRODUCTS,
                        dataLoadMore
                    });
                    resolve(response);
                })
                .catch((error) => {
                    console.log('LOAD_MORE_PRODUCTS Error:', error);
                    reject(error);
                });
        });
    };
};

export const loadMoreFreshProducts = (
    pageIndex,
    categoryIds,
    excludeProductIds,
    cateId,
    categoriesIdFresh,
    parentCate
) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const location = getState().locationReducer.Location.LocationInfo;
            const bodyApi = {
                token: '',
                us: '',
                provinceId: location.ProvinceId,
                districtId: 0,
                wardId: 0,
                storeId: location.StoreId,
                data: {
                    ListProducts: '',
                    PageIndex: pageIndex,
                    PageSize: 9,
                    Phone: '',
                    CategoryIds: categoryIds,
                    ExcludeProductIds: excludeProductIds,
                    CategoryId: cateId,
                    ListCategoryIds: categoriesIdFresh
                },
                IsMobile: true
            };
            apiBase(API_CONST.GET_FRESH_PRODUCTS, METHOD.POST, bodyApi)
                .then((response) => {
                    console.log('GET_FRESH_PRODUCTS Data:', response);
                    if (response.ResultCode > 0) {
                        reject(response);
                    } else {
                        const dataLoadMore = {
                            ...response,
                            cateId,
                            pageIndex,
                            parentCate
                        };
                        dispatch({
                            type: GET_FRESH_PRODUCTS,
                            dataLoadMore
                        });
                        resolve(response);
                    }
                })
                .catch((error) => {
                    console.log('GET_FRESH_PRODUCTS Error:', error);
                    reject(error);
                });
        });
    };
};
