import { apiBase, METHOD, API_CONST } from '@app/api';

const CATEGORY_GET = 'CATEGORY_GET';

export const cartAction = {
    CATEGORY_GET
};

export const category_get = function () {
    return (dispatch, getState) => {
        const option = {
            params: {
                categoryUrl: 'nuoc-ngot',
                provinceId: 3,
                storeId: 6463,
                phone: 0,
                isMobile: 'true',
                clearcache: 'ok'
            }
        };
        apiBase(API_CONST.API_CATEGORY_GET, METHOD.GET, null, option)
            .then((response) => {
                console.log('CATEGORY Data:', response);
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
