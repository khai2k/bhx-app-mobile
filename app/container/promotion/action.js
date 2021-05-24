import { apiBase, METHOD, API_CONST } from '@app/api';

const PROMOTIONPAGE_GET = 'PROMOTIONPAGE_GET';
const TOPDEALPROMOTION_GET = 'TOPDEALPROMOTION_GET';

export const promotionAction = {
    PROMOTIONPAGE_GET,
    TOPDEALPROMOTION_GET
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
                console.log(dataPromotionPage);
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
