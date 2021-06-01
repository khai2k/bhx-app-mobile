import * as _store from '../store/generalStore';
import * as _action from '../actions/generalAction';

const generalReducer = function (state = _store.generalState, action) {
    console.log('generalReducer', state, action);
    switch (action.type) {
        case _action.generalAction.GENERAL_LOCATION_GETCURRENT:
            return {
                ...state,
                Location: {
                    LocationInfo: action.crrLocationRs,
                    IsReminderLocation: state.Location.IsReminderLocation
                }
            };
        case _action.generalAction.GENERAL_LOCATION_REMINDER:
            console.log('GENERAL_LOCATION_REMINDER', state, action);
            return {
                ...state,
                Location: {
                    LocationInfo: state.Location.LocationInfo,
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
