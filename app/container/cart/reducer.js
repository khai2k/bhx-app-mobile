import * as _state from './state';
import * as _action from './action';

const cartReducer = function (state = _state.cartState, action) {
    console.log(action);
    switch (action.type) {
        case _action.cartAction.GET_CART:
            return {
                ...state,
                carId: action.CartId
            };

        default:
            return state;
    }
};

export { cartReducer };
