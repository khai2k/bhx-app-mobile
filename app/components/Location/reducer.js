import * as _state from './state';
import * as _action from './action';

const locationReducer = function (state = _state.locationState, action) {
    switch (action.type) {
        case _action.locationAction.LOCATION_GETCURRENT:
            return {
                ...state,
                crrLocationRs: action.crrLocationRs
            };
        default:
            return state;
    }
};

export { locationReducer };
