import * as _state from './state';
import * as _action from './action';

const orderSuccessReducer = function (
    state = _state.orderSuccessState,
    action
) {
    switch (action.type) {
        case _action.orderSuccessAction.ORDER_SUCCESS_GET:
            return {
                ...state,
                OrderInfo: action.orderInfo
            };
        case _action.orderSuccessAction.ORDER_SUCCESS_DELETE:
            return {
                ...state,
                OrderInfo: action.orderInfo
            };
        default:
            return state;
    }
};

export { orderSuccessReducer };
