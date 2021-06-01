import { combineReducers } from 'redux';
import { loginReducer } from '../container/login/reducer';
import { authenReducer } from '../container/splash/reducer';
// import { orderSuccessReducer } from '../container/OrderSuccess/reducer';
// import { cartReducer } from '../container/cart/reducer';
// import { categoryReducer } from '../container/group/reducer';
import { locationReducer } from '../components/Location/reducer';
import { homeReducer } from '../container/product/reducer';
import { menuReducer } from '../components/NavMenu/reducer';
import { productDetailReducer } from '../container/productDetail/reducer';
import { promotionReducer } from '../redux/reducers/promotionReducer';
import { voucherReducer } from '../container/useVoucher/reducer';

const appReducer = combineReducers({
    loginReducer,
    authenReducer,
    // cartReducer,
    locationReducer,
    // categoryReducer,
    homeReducer,
    menuReducer,
    productDetailReducer,
    promotionReducer,
    voucherReducer
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
