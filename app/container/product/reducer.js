import * as _action from './action';
import * as _state from './state';

const homeReducer = function (state = _state.homeState, action) {
    switch (action.type) {
        case _action.homeAction.GET_LIST_CATEGORIES:
            return {
                ...state,
                ListCategories: action.listCategories
            };
        case _action.homeAction.GET_LIST_PRODUCT:
            return {
                ...state,
                HomeData: action.homeData
            };
        case _action.homeAction.GET_MORE_LIST_PRODUCT:
            return {
                ...state,
                LoadMoreProducts: action.loadMoreProducts
            };
        default:
            return state;
    }
};
export { homeReducer };
