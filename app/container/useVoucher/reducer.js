import * as _state from './state';
import * as _action from './action';

const voucherReducer = function (state = _state.voucherState, action) {
    switch (action.type) {
        case _action.voucherAction.VOUCHER_ADD:
            return {
                ...state,
                VoucherInfo: action.voucherInfo
            };
        case _action.voucherAction.VOUCHER_GET:
            return {
                ...state,
                VoucherInfo: action.voucherInfo
            };
        case _action.voucherAction.VOUCHER_DELETE:
            return {
                ...state,
                VoucherInfo: action.voucherInfo
            };
        case _action.voucherAction.DATA_LOADING:
            return {
                ...state,
                IsLoading: true
            };
        case _action.voucherAction.DATA_LOADED:
            return {
                ...state,
                IsLoading: false
            };
        default:
            return state;
    }
};

export { voucherReducer };
