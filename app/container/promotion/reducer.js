import * as _action from './action';

const initialState = {};

const promotionReducer = function (state = initialState, action) {
    switch (action.type) {
        case _action.promotionAction.PROMOTIONPAGE_GET:
            return {
                ...state,
                Promotion: action.dataPromotionPage
            };
        case _action.promotionAction.TOPDEALPROMOTION_GET:
            return {
                ...state,
                TopDealPromotion: action.dataTopDealPromotion
            };
        default:
            return state;
    }
};

export { promotionReducer };
