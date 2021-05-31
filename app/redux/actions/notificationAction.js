import { apiBase, METHOD, API_CONST } from '@app/api';

const NOTIFICATION_GET = 'NOTIFICATION_GET';

export const Notification_Action = {
    NOTIFICATION_GET
};

// Get danh sách notification
export const notification_get = () => {
    return (dispatch) => {
        const bodyApi = {
            token: '',
            us: '',
            provinceId: 0,
            districtId: 0,
            wardId: 0,
            storeId: 0,
            data: {
                deviceid: 'ed2edf0a5f84f8d3',
                token: 'eI_zMHRxRtCj-Q1_CVm-Fv:APA91bHVgTX8Lh-HVjFQ5cRtSi8d6AI0Vcp90TBWVwZ4H_m8JVbW5_0I1TTodrdKh7syRvqmnt64qSS8QwiK2isqfWuJyznQWgvL29rYik78UPc9Q7nca2DcQbuD-NhS5YlqQFANHeNY',
                deviceType: 'android',
                pageIndex: 0,
                pageSize: 10
            },
            IsMobile: true
        };
        apiBase(API_CONST.API_NOTIFICATION_GET_LIST, METHOD.POST, bodyApi)
            .then((response) => {
                const listNotification = response.Value.object.data;
                dispatch({
                    type: NOTIFICATION_GET,
                    listNotification
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
