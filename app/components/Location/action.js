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
                Lat: crrLong,
                IsLive: false
            }
        };
        apiBase(API_CONST.API_LOCATION_GETBYCOORDINATES, METHOD.POST, bodyApi)
            .then((response) => {
                const tmpData = response.OrtherData;

                const crrLocationRs = { ...tmpData, FullAddress: '' };
                if (response.ResultCode === 0) {
                    let _fullAddress = '';
                    if (crrLocationRs.WardName !== '') {
                        _fullAddress += `${crrLocationRs.WardName}, `;
                    }
                    if (crrLocationRs.DistrictName !== '') {
                        _fullAddress += `${crrLocationRs.DistrictName}, `;
                    }
                    if (crrLocationRs.ProvinceFullName !== '') {
                        _fullAddress += `${crrLocationRs.ProvinceFullName}`;
                    }
                    crrLocationRs.FullAddress = _fullAddress;
                }
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
