import * as _action from '../actions/promotionAction';

const initialState = [];

const promotionReducer = function (state = initialState, action) {
    switch (action.type) {
        case _action.promotionAction.DATA_LOADING:
            return {
                ...state,
                IsLoading: true
            };
        case _action.promotionAction.DATA_LOADED:
            return {
                ...state,
                IsLoading: false
            };
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
                    return {
                        ...element,
                        Products: [
                            ...element.Products,
                            ...action.dataLoadMoreProductsGroup.Value
                        ],
                        Query: {
                            ...element.Query,
                            PageIndex: element.Query.PageIndex + 1,
                            PromotionCount:
                                element.Query.PromotionCount -
                                element.Query.PageSize
                        }
                    };
                } else {
                    return element;
                }
            });
            return {
                ...state,
                Promotion: {
                    ...state.Promotion,
                    GroupCate: cloneGroupCate
                }
            };
        }
        case _action.promotionAction.GET_PRODUCT_BY_SUB_CATE: {
            const cloneSubCate = state.Promotion.GroupCate.map((element) => {
                if (
                    element.CategoryId ===
                    action.dataProductBySubCate.CategoryId
                ) {
                    return {
                        ...element,
                        Products: action.dataProductBySubCate.Value,
                        Query: {
                            ...element.Query,
                            ExcludeProductIds:
                                action.dataProductBySubCate.OtherData
                                    .ExcludeProductIds,
                            PromotionCount:
                                action.dataProductBySubCate.OtherData.Total > 6
                                    ? action.dataProductBySubCate.OtherData
                                          .Total - 6
                                    : 0,
                            StringCates:
                                action.dataProductBySubCate.StringCates,
                            PageIndex: 0
                        },
                        GroupCateFilterId:
                            action.dataProductBySubCate.StringCates
                    };
                } else {
                    return element;
                }
            });
            return {
                ...state,
                Promotion: {
                    ...state.Promotion,
                    GroupCate: cloneSubCate
                }
            };
        }

        default:
            return state;
    }
};

export { promotionReducer };
