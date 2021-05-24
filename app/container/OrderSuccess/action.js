import { apiBase, METHOD, API_CONST } from '@app/api';

const ORDER_SUCCESS_GET = 'ORDER_SUCCESS_GET';

export const orderSuccessAction = {
    ORDER_SUCCESS_GET
};

const provinceId = 3;
const districtId = 2087;
const wardId = 27125;
const storeId = 6463;
const orderId = 43225473;
const sc = 'E214C53EC0384610FE95151117020DA6';

export const orderSuccess_get = function () {
    return (dispatch) => {
        const bodyApi = {
            provinceId,
            districtId,
            wardId,
            storeId,
            orderId,
            sc
        };
        apiBase(API_CONST.API_REQUEST_GET_ODER_SUCCESS, METHOD.POST, bodyApi)
            .then((response) => {
                console.log('Data:', response);
                const orderInfo = response.Value;
                dispatch({
                    type: ORDER_SUCCESS_GET,
                    orderInfo
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
