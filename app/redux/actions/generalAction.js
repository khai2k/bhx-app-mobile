import { apiBase, METHOD, API_CONST } from '@app/api';

const GENERAL_MENU_GET = 'GENERAL_MENU_GET';
const GENERAL_SET_CARTID = 'GENERAL_SET_CARTID';

export const generalAction = {
    GENERAL_MENU_GET,
    GENERAL_SET_CARTID
};

export const menu_get = function () {
    return (dispatch, getState) => {
        const locationInfo = getState().locationReducer.Location.LocationInfo;
        apiBase(
            API_CONST.API_GET_CATEGORY_NAVIGATION,
            METHOD.GET,
            {},
            {
                params: {
                    categoryId: 0,
                    provinceId: locationInfo.ProvinceId,
                    storeId: 0,
                    phone: '',
                    isMobile: true,
                    clearcache: 'ok'
                }
            }
        )
            .then((response) => {
                // Parse dữ liệu để dùng cho sectionList
                console.log(response);
                const menu = response.Value.reduce(
                    (accum, item) => [
                        ...accum,
                        {
                            ...item,
                            data: item.Childrens != null ? item.Childrens : []
                        }
                    ],
                    []
                );
                dispatch({
                    type: GENERAL_MENU_GET,
                    menu
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const setCartId = (cartId) => {
    return (dispatch) => {
        dispatch({
            type: GENERAL_SET_CARTID,
            cartId
        });
    };
};
