import * as _store from '../store/generalStore';
import * as _action from '../actions/generalAction';

const generalReducer = function (state = _store.generalState, action) {
    switch (action.type) {
        case _action.generalAction.GENERAL_LOCATION_GETCURRENT:
            return {
                ...state,
                Location: {
                    LocationInfo: action.crrLocationRs
                }
            };
        case _action.generalAction.GENERAL_LOCATION_REMINDER:
            return {
                ...state,
                Location: {
                    IsReminderLocation: action.showReminder
                }
            };
        case _action.generalAction.GENERAL_MENU_GET:
            return {
                ...state,
                Menu: action.menu
            };
        default:
            return state;
    }
};

export { generalReducer };
