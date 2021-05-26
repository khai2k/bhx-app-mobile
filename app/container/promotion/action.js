import { apiBase, METHOD, API_CONST } from '@app/api';

const PROMOTIONPAGE_GET = 'PROMOTIONPAGE_GET';
const TOPDEALPROMOTION_GET = 'TOPDEALPROMOTION_GET';
const LOAD_MORE_PRODUCTS_GROUP = 'LOAD_MORE_PRODUCTS_GROUP';
const GET_PRODUCT_BY_SUB_CATE = 'GET_PRODUCT_BY_SUB_CATE';
const DATA_LOADING = 'DATA_LOADING';

export const promotionAction = {
    PROMOTIONPAGE_GET,
    TOPDEALPROMOTION_GET,
    LOAD_MORE_PRODUCTS_GROUP,
    GET_PRODUCT_BY_SUB_CATE,
    DATA_LOADING
};

// Param để lấy danh sách cate
const provinceId = 3;
const storeId = 6463;
const phone = 0;
const clearcache = 'ok';

// Get dữ liệu trang khuyến mãi
export const promotionPage_get = function () {
    return (dispatch) => {
        dispatch({ type: DATA_LOADING });
        apiBase(
            API_CONST.API_GET_PROMOTIONPAGE_GETLISTCATEGORY,
            METHOD.GET,
            {},
            {
                params: {
                    provinceId,
                    storeId,
                    phone,
                    clearcache
                }
            }
        )
            .then((response) => {
                const LINE_COLOR = [
                    'orange-line',
                    'green-line',
                    'blue-line',
                    'red-line',
                    'pink-line',
                    'aqua-line',
                    'skyblue-line',
                    'purple-line',
                    'red-line'
                ];
                response.Value.GroupCate.map(
                    // eslint-disable-next-line array-callback-return
                    (element, index) => {
                        element.LineColor = LINE_COLOR[index];
                        element.Query.PromotionCount =
                            element.PromotionCount !== 0
                                ? element.PromotionCount + 1
                                : element.PromotionCount;
                    }
                );
                const dataPromotionPage = response.Value;
                dispatch({
                    type: PROMOTIONPAGE_GET,
                    dataPromotionPage
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

// Get danh sách sách phẩm deal shock
export const topDealPromotion_get = function () {
    return (dispatch) => {
        dispatch({ type: DATA_LOADING });
        apiBase(
            API_CONST.API_GET_TOPDEALPROMOTION,
            METHOD.GET,
            {},
            {
                params: {
                    provinceId,
                    storeId
                }
            }
        )
            .then((response) => {
                const dataTopDealPromotion = response.Value;
                dispatch({
                    type: TOPDEALPROMOTION_GET,
                    dataTopDealPromotion
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

// Load more sản phẩm group cate
export const loadMoreProductsGroup_post = (
    PageIndex,
    PageSize,
    ExcludeProductIds,
    CategoryId,
    StringCates
) => {
    return (dispatch) => {
        dispatch({ type: DATA_LOADING });
        const bodyApi = {
            PageIndex,
            PageSize,
            ExcludeProductIds: ExcludeProductIds?.toString(),
            ProvinceId: provinceId,
            StoreId: storeId,
            Phone: 'string',
            CategoryId,
            StringCates
        };
        apiBase(
            API_CONST.API_POST_LOAD_MORE_PRODUCTS_GROUP,
            METHOD.POST,
            bodyApi
        )
            .then((response) => {
                const dataLoadMoreProductsGroup = {
                    ...response,
                    CategoryId
                };
                dispatch({
                    type: LOAD_MORE_PRODUCTS_GROUP,
                    dataLoadMoreProductsGroup
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

// Get danh sách sản phẩm sub cate
export const productBySubCate_post = (
    PageIndex,
    PageSize,
    ExcludeProductIds,
    CategoryId,
    StringCates
) => {
    return (dispatch) => {
        dispatch({ type: DATA_LOADING });
        const bodyApi = {
            PageIndex,
            PageSize,
            ExcludeProductIds: ExcludeProductIds?.toString(),
            ProvinceId: provinceId,
            StoreId: storeId,
            Phone: 'string',
            CategoryId,
            StringCates
        };
        apiBase(API_CONST.API_POST_PRODUCT_BY_SUB_CATE, METHOD.POST, bodyApi)
            .then((response) => {
                const dataProductBySubCate = {
                    ...response,
                    CategoryId,
                    StringCates
                };
                dispatch({
                    type: GET_PRODUCT_BY_SUB_CATE,
                    dataProductBySubCate
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
