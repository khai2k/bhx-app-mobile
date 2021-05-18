import * as _state from './state';
import * as _action from './action';

const cartReducer = function (state = _state.cartState, action) {
    switch (action.type) {
        case _action.cartAction.CART_GET:
            return {
                ...state,
                Cart: action.cartInfo.Cart,
                CartTotal: action.cartInfo.Cart
            };
        case _action.cartAction.CART_REMOVE_ITEM_PRODUCT:
            return {
                ...state,
                Cart: action.cartInfo.Cart,
                CartTotal: action.cartInfo.Cart
            };
        case _action.cartAction.CART_ADD_ITEM_PRODUCT:
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
