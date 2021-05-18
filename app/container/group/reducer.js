import * as _state from './state';
import * as _action from './action';

const categoryReducer = function (state = _state.categoryState, action) {
    switch (action.type) {
        case _action.categoryAction.CATEGORY_GET:
            return {
                ...state,
                Info: action.categoryInfo.Info,
                Brands: action.categoryInfo.Brands,
                Filters: action.categoryInfo.Filters,
                CurrentData: action.categoryInfo.CurrentData
            };
        case _action.categoryAction.CATEGORY_FILTER:
            return {
                ...state,
                CurrentData: action.categoryInfo.CurrentData
            };
        case _action.categoryAction.SELECT_BRAND:
            return {
                ...state,
                SelectedBrand: action.selectedBrandId
            };
        case _action.categoryAction.SELECT_PROPERTY:
            return {
                ...state,
                SelectedProps: action.propertyIdList
            };
        case _action.categoryAction.SELECT_SORT:
            return {
                ...state,
                SelectedSort: action.sortId
            };
        default:
            return state;
    }
};

export { categoryReducer };
