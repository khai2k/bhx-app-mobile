import * as _state from './state';
import * as _action from './action';

const orderSuccessReducer = function (
    state = _state.orderSuccessState,
    action
) {
    console.log('orderSuccessReducer');
    console.log(state);
    console.log(action);
    switch (action.type) {
        case _action.orderSuccessAction.ORDER_SUCCESS_GET:
            return {
                ...state,
                orderSucces: action.orderSuccessInfo.OrderSuccess
            };
        default:
            return state;
    }
};

export { orderSuccesstReducer };
