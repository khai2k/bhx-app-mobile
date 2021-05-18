import { apiBase, METHOD, API_CONST } from '@app/api';

const LOCATION_GETCURRENT = 'LOCATION_GETCURRENT';

export const locationAction = {
    LOCATION_GETCURRENT
};

export const location_getCurrent = function () {
    return (dispatch) => {
        const bodyApi = {
            data: {
                Lng: '10.8385859',
                Lat: '106.8305654'
            }
        };
        apiBase(API_CONST.API_GET_LOCATION, METHOD.POST, bodyApi)
            .then((response) => {
                const rs = response.Value;
                console.log(rs);
                dispatch({
                    type: LOCATION_GETCURRENT,
                    rs
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
