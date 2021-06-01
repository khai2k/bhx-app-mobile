import * as _store from '../store/generalStore';
import * as _action from '../actions/generalAction';

const generalReducer = function (state = _store.generalState, action) {
    switch (action.type) {
        case _action.generalAction.GENERAL_MENU_GET:
            return {
                ...state,
                Menu: action.menu
            };
        case _action.generalAction.GENERAL_SET_CARTID:
            return {
                ...state,
                CartId: action.cartId
            };
        default:
            return state;
    }
};

export { generalReducer };
