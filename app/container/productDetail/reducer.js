// import * as _state from './state';
// import { cartState } from '../cart/state';
import * as _action from './action';

const productDetailStateInit = {
    Product_detail: [],
    Product_relative: [],
    Combo_detail: [],
    Box_banner: '',
    isExchangeProduct: true
};

const productDetailReducer = function (state = productDetailStateInit, action) {
    switch (action.type) {
        case _action.productDetailAction.GET_PRODUCT_DETAIL:
            if (action.data.exchangeProducts.length <= 1) {
                return {
                    ...state,
                    Product_detail: action.data,
                    isExchangeProduct: false
                };
            } else {
                return {
                    ...state,
                    Product_detail: action.data
                };
            }
        case _action.productDetailAction.GET_PRODUCT_RELATIVE:
            return {
                ...state,
                Product_relative: action.data
            };
        case _action.productDetailAction.GET_COMBO_DETAIL:
            return {
                ...state,
                Combo_detail: action.data
            };
        case _action.productDetailAction.GET_BOX_BANNER:
            return {
                ...state,
                Box_banner: action.data
            };
        default:
            return state;
    }
};

export { productDetailReducer };
