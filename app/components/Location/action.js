import { apiBase, METHOD, API_CONST } from '@app/api';

const LOCATION_GETCURRENT = 'LOCATION_GETCURRENT';

export const locationAction = {
    LOCATION_GETCURRENT
};

export const location_getCurrent = function (crrLat, crrLong) {
    return (dispatch) => {
        const bodyApi = {
            data: {
                Lng: crrLat,
                Lat: crrLong
            }
        };
        apiBase(API_CONST.API_GET_LOCATION, METHOD.POST, bodyApi)
            .then((response) => {
                const crrLocationRs = response.Value;
                dispatch({
                    type: LOCATION_GETCURRENT,
                    crrLocationRs
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
