import * as _state from './state';
import * as _action from './action';

const cartReducer = function (state = _state.cartState, action) {
    switch (action.type) {
        case _action.cartAction.GET_CART:
            return {
                ...state,
                Cart: action.cartInfo.Cart,
                CartTotal: action.cartInfo.Cart
            };

        default:
            return state;
    }
};

export { cartReducer };
