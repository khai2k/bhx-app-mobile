import * as _state from './state';
import * as _action from './action';

const locationReducer = function (state = _state.crrProvinceState, action) {
    switch (action.type) {
        case _action.locationAction.location_getCurrent:
            return {
                ...state
            };
        default:
            return state;
    }
};

export { locationReducer };
