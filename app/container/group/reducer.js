import * as _state from './state';
import * as _action from './action';

const categoryReducer = function (state = _state.categoryState, action) {
    console.log('categoryReducer');
    console.log(state);
    console.log(action);
    switch (action.type) {
        case _action.cartAction.CATEGORY_GET:
            return {
                ...state,
                Info: action.categoryInfo.Info,
                Brands: action.categoryInfo.Brands,
                Filters: action.categoryInfo.Filters,
                CurrentData: action.categoryInfo.CurrentData
            };
        default:
            return state;
    }
};

export { categoryReducer };
