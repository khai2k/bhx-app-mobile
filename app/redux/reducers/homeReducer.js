import * as _action from '../actions/homeAction';
import * as _state from '../store/homeStore';

const homeReducer = function (state = _state.homeState, action) {
    switch (action.type) {
        case _action.homeAction.GET_LIST_CATEGORIES:
            return {
                ...state,
                ListCategories: action.listCategories
            };
        case _action.homeAction.GET_CATE_LINES:
            return {
                ...state,
                CateLines: action.cateLines
            };
        case _action.homeAction.GET_HOME_DATA:
            return {
                ...state,
                ListLineProducts: action.homeData.Value,
                MaxPage: action.homeData.OtherData.MaxPage
            };
        case _action.homeAction.LOAD_MORE_HOME_DATA: {
            // reset pageIndex = 0 cho từng line
            const dataLines = action.homeData.Value.map((item) => {
                item.PageIndex = 0;
                return item;
            });
            return {
                ...state,
                ListLineProducts: [...state.ListLineProducts, ...dataLines],
                GroupMenuString: action.homeData.OtherData.GroupMenuString,
                IsNextGroup: action.homeData.OtherData.IsNextGroup,
                PageIndexLine: action.homeData.pageIndex + 1
            };
        }
        case _action.homeAction.LOAD_MORE_PRODUCTS: {
            const dataListLineProducts = state.ListLineProducts.map(
                (element) => {
                    if (element.CategoryId === action.dataLoadMore.groupId) {
                        return {
                            ...element,
                            Products: [
                                ...element.Products,
                                ...action.dataLoadMore.Value
                            ],
                            PageIndex: element.PageIndex + 1,
                            PromotionCount:
                                action.dataLoadMore.OtherData.TotalRest
                        };
                    } else {
                        return element;
                    }
                }
            );
            return {
                ...state,
                ListLineProducts: dataListLineProducts
            };
        }
        case _action.homeAction.GET_FRESH_PRODUCTS: {
            const dataListLineProducts = state.ListLineProducts.map(
                (element) => {
                    if (element.CategoryId === action.dataLoadMore.parentCate) {
                        if (action.dataLoadMore.pageIndex === 0) {
                            return {
                                ...element,
                                Products: action.dataLoadMore.Value,
                                PageIndex: 1,
                                PromotionCount:
                                    action.dataLoadMore.OtherData.TotalRest,
                                FreshCategorys:
                                    action.dataLoadMore.OtherData.Chldcate
                            };
                        } else {
                            return {
                                ...element,
                                Products: [
                                    ...element.Products,
                                    ...action.dataLoadMore.Value
                                ],
                                PageIndex: element.PageIndex + 1,
                                PromotionCount:
                                    action.dataLoadMore.OtherData.TotalRest
                            };
                        }
                    } else {
                        return element;
                    }
                }
            );
            return {
                ...state,
                ListLineProducts: dataListLineProducts
            };
        }
        default:
            return state;
    }
};
export { homeReducer };
