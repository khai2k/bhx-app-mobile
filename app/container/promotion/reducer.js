import * as _action from './action';

const initialState = [];

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
        case _action.promotionAction.LOAD_MORE_PRODUCTS_GROUP: {
            const cloneGroupCate = state.Promotion.GroupCate.map((element) => {
                if (
                    element.CategoryId ===
                    action.dataLoadMoreProductsGroup.CategoryId
                ) {
                    const ExcludeProductIds =
                        action.dataLoadMoreProductsGroup.Value?.map((val) => {
                            return val.Id;
                        });

                    return {
                        ...element,
                        Products: [
                            ...element.Products,
                            ...action.dataLoadMoreProductsGroup.Value
                        ],
                        Query: {
                            ...element.Query,
                            ExcludeProductIds: [
                                element.Query.ExcludeProductIds,
                                ExcludeProductIds.join(',')
                            ].toString(),
                            PageIndex: element.Query.PageIndex + 1
                        },
                        PromotionCount:
                            element.PromotionCount - element.Query.PageSize
                    };
                } else {
                    return element;
                }
            });
            console.log(cloneGroupCate);
            return {
                ...state,
                Promotion: {
                    ...state.Promotion,
                    GroupCate: cloneGroupCate
                }
            };
        }

        default:
            return state;
    }
};

export { promotionReducer };
