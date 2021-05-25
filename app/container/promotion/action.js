import { apiBase, METHOD, API_CONST } from '@app/api';

const PROMOTIONPAGE_GET = 'PROMOTIONPAGE_GET';
const TOPDEALPROMOTION_GET = 'TOPDEALPROMOTION_GET';
const LOAD_MORE_PRODUCTS_GROUP = 'LOAD_MORE_PRODUCTS_GROUP';

export const promotionAction = {
    PROMOTIONPAGE_GET,
    TOPDEALPROMOTION_GET,
    LOAD_MORE_PRODUCTS_GROUP
};

// Param để lấy danh sách cate
const provinceId = 3;
const storeId = 6463;
const phone = 0;
const clearcache = 'ok';

export const promotionPage_get = function () {
    return (dispatch) => {
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
                const dataPromotionPage = response.Value;
                dataPromotionPage?.GroupCate?.push(
                    dataPromotionPage?.GroupCate?.shift()
                );
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

export const topDealPromotion_get = function () {
    return (dispatch) => {
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

export const loadMoreProductsGroup_post = (
    PageIndex,
    PageSize,
    ExcludeProductIds,
    CategoryId,
    StringCates
) => {
    return (dispatch) => {
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
