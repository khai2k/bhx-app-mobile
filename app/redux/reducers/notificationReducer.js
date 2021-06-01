import * as _action from '../actions/notificationAction';

const initialState = [];

const notificationReducer = function (state = initialState, action) {
    switch (action.type) {
        case _action.Notification_Action.NOTIFICATION_GET:
            return {
                ...state,
                ListNotification: action.listNotification
            };
        default:
            return state;
    }
};

export { notificationReducer };
