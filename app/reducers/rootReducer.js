import { combineReducers } from 'redux';
//  import { generalReducer } from '../redux/reducers/generalReducer';
import { loginReducer } from '../container/login/reducer';
import { authenReducer } from '../container/splash/reducer';
// import { orderSuccessReducer } from '../container/OrderSuccess/reducer';
import { cartReducer } from '../redux/reducers/cartReducer';
import { categoryReducer } from '../container/group/reducer';
import { locationReducer } from '../components/Location/reducer';
import { homeReducer } from '../container/product/reducer';
import { menuReducer } from '../components/NavMenu/reducer';
import { productDetailReducer } from '../container/productDetail/reducer';
import { promotionReducer } from '../container/promotion/reducer';
import { searchReducer } from '../container/search/reducer';

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
