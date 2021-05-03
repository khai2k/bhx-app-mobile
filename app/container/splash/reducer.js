import * as _state from './state';
import * as _action from './action';

const authenReducer = function (state = _state.authenState, action) {
    switch (action.type) {
        case _action.authenAction.SHOW_SPLASH:
            return {
                ...state,
                isShowSplash: action.isShowSplash
            };

        default:
            return state;
    }
};

export { authenReducer };
