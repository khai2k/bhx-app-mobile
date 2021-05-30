import { combineReducers } from 'redux';
//  import { generalReducer } from '../redux/reducers/generalReducer';
import { loginReducer } from '@app/container/login/reducer';
import { authenReducer } from '@app/container/splash/reducer';
// import { orderSuccessReducer } from '../container/OrderSuccess/reducer';
import { categoryReducer } from '@app/container/group/reducer';
import { locationReducer } from '@app/components/Location/reducer';
import { homeReducer } from '@app/container/product/reducer';
import { menuReducer } from '@app/components/NavMenu/reducer';
import { productDetailReducer } from '@app/container/productDetail/reducer';
import { promotionReducer } from '@app/container/promotion/reducer';
import { searchReducer } from '@app/container/search/reducer';
import { cartReducer } from './cartReducer';

const appReducer = combineReducers({
    loginReducer,
    authenReducer,
    cartReducer,
    locationReducer,
    categoryReducer,
    homeReducer,
    menuReducer,
    productDetailReducer,
    promotionReducer,
    searchReducer
    //  generalReducer
    // orderSuccessReducer
});
const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    switch (action.type) {
        case 'RESET_ALL':
            state = undefined;
            break;
        default:
            break;
    }

    return appReducer(state, action);
};

export { rootReducer };
