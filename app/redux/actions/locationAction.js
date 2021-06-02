import { apiBase, METHOD, API_CONST } from '@app/api';
import { Storage, helper } from '@app/common';
import { CONST_STORAGE } from '@app/constants';

const GENERAL_LOCATION_GETCURRENT = 'GENERAL_LOCATION_GETCURRENT';
const GENERAL_LOCATION_REMINDER = 'GENERAL_LOCATION_REMINDER';

export const locationAction = {
    GENERAL_LOCATION_GETCURRENT,
    GENERAL_LOCATION_REMINDER
};

export const location_getCurrent = function (crrLat, crrLong) {
    console.log('location_getCurrent');
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const bodyApi = {
                data: {
                    Lng: crrLat,
                    Lat: crrLong,
                    IsLive: false
                }
            };
            apiBase(
                API_CONST.API_LOCATION_GETBYCOORDINATES,
                METHOD.POST,
                bodyApi
            )
                .then((response) => {
                    const tmpData = response.OtherData;
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

                        Storage.setItem(
                            CONST_STORAGE.SESSION_LOCATION_CURRENT,
                            JSON.stringify(crrLocationRs)
                        );
                    }
                    resolve(response);
                    dispatch({
                        type: GENERAL_LOCATION_GETCURRENT,
                        crrLocationRs
                    });
                })
                .catch((error) => {
                    reject(error);
                    console.log(error);
                });
        });
    };
};

export const location_SaveChooseLocation = (crrLocationRs) => {
    return (dispatch) => {
        Storage.setItem(
            CONST_STORAGE.SESSION_LOCATION_CURRENT,
            JSON.stringify(crrLocationRs)
        );

        dispatch({
            type: GENERAL_LOCATION_GETCURRENT,
            crrLocationRs
        });
    };
};

export const showReminderLocation = (status) => {
    console.log('showReminderLocation');
    return (dispatch) => {
        const showReminder = status;
        dispatch({
            type: GENERAL_LOCATION_REMINDER,
            showReminder
        });
    };
};
