import * as _action from './action';

const initialState = [];

const promotionReducer = function (state = initialState, action) {
    switch (action.type) {
        case _action.promotionAction.DATA_LOADING:
            return {
                ...state,
                IsLoading: true
            };
        case _action.promotionAction.PROMOTIONPAGE_GET:
            return {
                ...state,
                Promotion: action.dataPromotionPage,
                IsLoading: false
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
                },
                IsLoading: false
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
                                action.dataProductBySubCate.OtherData.Total,
                            StringCates: action.dataProductBySubCate.StringCates
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
                },
                IsLoading: false
            };
        }

        default:
            return state;
    }
};

export { promotionReducer };
