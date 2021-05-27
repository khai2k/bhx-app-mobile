import * as _state from './state';
import * as _action from './action';

const searchReducer = function (state = _state.searchState, action) {
    switch (action.type) {
        case _action.searchAction.SEARCH_GET:
            return {
                ...state,
                Filter: action.searchInfo.Filter,
                Products: action.searchInfo.Products,
                OEMProducts: action.searchInfo.OEMProducts
            };
        // case _action.categoryAction.CATEGORY_FILTER:
        //     return {
        //         ...state,
        //         CurrentData: action.categoryInfo.CurrentData
        //     };
        case _action.searchAction.SELECT_BRAND:
            return {
                ...state,
                SelectedBrand: action.selectedBrandId
            };
        case _action.searchAction.SELECT_PROPERTY:
            return {
                ...state,
                SelectedProps: action.propertyIdList
            };
        case _action.searchAction.SELECT_SORT:
            return {
                ...state,
                SelectedSort: action.sortId
            };
        default:
            return state;
    }
};

export { searchReducer };
