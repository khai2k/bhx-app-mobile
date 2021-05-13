import { apiBase, METHOD } from '@app/api';
import { API_CONST } from '@app/constants';

const GET_CART = 'GET_CART';

export const cartAction = {
    GET_CART
};

export const get_cart = function (cartInfo) {
    return (dispatch) => {
        const bodyAPI = {
            cartid:
                '9D6D54B6FC4B56FDF27C975769EBA8B8A65AC3EDC0F60F16B23E63790465F92C',
            provinceId: 3,
            districtId: 0,
            wardId: 0,
            storeId: 6463,
            tk: 0
        };
        console.log('response api authen :', bodyAPI);
        const response = apiBase(
            API_CONST.API_REQUEST_GET_CART,
            METHOD.POST,
            bodyAPI,
            {
                isCustomToken: true,
                isOauthenToken: false,
                isUpload: false
            }
        );
        console.log('response api authen :', response);
        dispatch({
            type: GET_CART,
            response
        });
    };
};
