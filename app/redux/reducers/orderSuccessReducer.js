import * as _store from '../store/orderSuccessStore';
import * as _action from '../actions/orderSuccessAction';

const orderSuccessReducer = function (
    state = _store.orderSuccessState,
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
