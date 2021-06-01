import * as _store from '../store/locationStore';
import * as _action from '../actions/locationAction';

const locationReducer = function (state = _store.locationState, action) {
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
            return {
                ...state,
                Location: {
                    LocationInfo: state.Location.LocationInfo,
                    IsReminderLocation: action.showReminder
                }
            };
        default:
            return state;
    }
};

export { locationReducer };
