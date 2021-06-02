import * as _action from '../actions/productDetailAction';
import * as _store from '../store/productDetailStore';

const productDetailReducer = function (
    state = _store.productDetailState,
    action
) {
    switch (action.type) {
        case _action.productDetailAction.IS_LOADING:
            return {
                ...state,
                Is_loading: action.data
            };
        case _action.productDetailAction.GET_GALLERY_PRODUCT:
            return {
                ...state,
                Gallery_product: action.data
            };
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
                    Product_detail: action.data,
                    isExchangeProduct: true
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
