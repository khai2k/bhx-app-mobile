import * as _state from './state';
import * as _action from './action';

const menuReducer = function (state = _state.menuState, action) {
    switch (action.type) {
        case _action.menuAction.MENU_GET:
            return {
                ...state,
                Menu: action.menu,
            };
        default:
            return state;
    }
};

export{menuReducer}  ;
