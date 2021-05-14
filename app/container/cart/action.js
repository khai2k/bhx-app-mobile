import { apiBase, METHOD } from '@app/api';
import { API_CONST } from '@app/constants';

const GET_CART = 'GET_CART';

export const cartAction = {
    GET_CART
};

export const get_cart = function () {
    return async (dispatch, getSate) => {
        const bodyApi = {
            token: getSate().cartReducer.Cart.CartId,
            us: '',
            provinceId: 3,
            districtId: 0,
            wardId: 0,
            storeId: 6463,
            data: {
                cartId: getSate().cartReducer.Cart.CartId
            }
        };
        const response = await apiBase(
            API_CONST.API_REQUEST_GET_CART,
            METHOD.POST,
            bodyApi,
            {
                isCustomToken: false,
                isOauthenToken: false,
                isUpload: false
            }
        );
        const cartInfo = response.Value;
        console.log('response api Nhu test:', cartInfo);
        dispatch({
            type: GET_CART,
            cartInfo
        });
    };
};
