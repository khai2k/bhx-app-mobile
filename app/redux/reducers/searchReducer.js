import * as _state from '../store/searchStore';
import * as _action from '../actions/searchAction';

const searchReducer = function (state = _state.searchState, action) {
    switch (action.type) {
        case _action.searchAction.SEARCH_GET:
            return {
                ...state,
                Filter: action.searchInfo.Value.Filter,
                Products: action.searchInfo.Value.Products,
                OEMProducts: action.searchInfo.Value.OEMProducts,
                OtherData: action.searchInfo.OtherData
            };
        case _action.searchAction.SEARCH_FILTER:
            return {
                ...state,
                Products: action.searchInfo.Value,
                OtherDataAjax: action.searchInfo.OtherData
            };
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
