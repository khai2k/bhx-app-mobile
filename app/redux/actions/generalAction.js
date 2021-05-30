import { apiBase, METHOD, API_CONST } from '@app/api';
import { Storage, helper } from '@app/common';
import { CONST_STORAGE } from '@app/constants';

const GENERAL_MENU_GET = 'GENERAL_MENU_GET';
const GENERAL_LOCATION_GETCURRENT = 'GENERAL_LOCATION_GETCURRENT';
const GENERAL_LOCATION_REMINDER = 'GENERAL_LOCATION_REMINDER';

export const generalAction = {
    GENERAL_MENU_GET,
    GENERAL_LOCATION_GETCURRENT,
    GENERAL_LOCATION_REMINDER
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
                dispatch({
                    type: GENERAL_LOCATION_GETCURRENT,
                    crrLocationRs
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const location_SaveChooseLocation = function (crrLocationRs) {
    return (dispatch) => {
        console.log(
            `location_SaveChooseLocation crrLocationRs: ${crrLocationRs}`
        );
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
    return (dispatch) => {
        const showReminder = status;
        dispatch({
            type: GENERAL_LOCATION_REMINDER,
            showReminder
        });
    };
};

export const menu_get = function () {
    return (dispatch, getState) => {
        const locationInfo = getState().generalState.Location.LocationInfo;
        apiBase(
            API_CONST.API_GET_CATEGORY_NAVIGATION,
            METHOD.GET,
            {},
            {
                params: {
                    categoryId: 0,
                    provinceId: locationInfo.ProvinceId,
                    storeId: locationInfo.StoreId,
                    phone: '',
                    isMobile: true,
                    clearcache: 'ok'
                }
            }
        )
            .then((response) => {
                // Parse dữ liệu để dùng cho sectionList
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
