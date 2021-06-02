import { combineReducers } from 'redux';
import { loginReducer } from '@app/container/login/reducer';
import { authenReducer } from '@app/container/splash/reducer';
// import { orderSuccessReducer } from '../container/OrderSuccess/reducer';
import { menuReducer } from '@app/components/NavMenu/reducer';
import { productDetailReducer } from '@app/container/productDetail/reducer';
import { promotionReducer } from '@app/container/promotion/reducer';
import { homeReducer } from './homeReducer';
import { searchReducer } from './searchReducer';
import { generalReducer } from './generalReducer';
import { categoryReducer } from './groupReducer';
import { cartReducer } from './cartReducer';
import { voucherReducer } from '../../container/useVoucher/reducer';
import { notificationReducer } from './notificationReducer';

const appReducer = combineReducers({
    loginReducer,
    authenReducer,
    cartReducer,
    //  locationReducer,
    categoryReducer,
    homeReducer,
    menuReducer,
    productDetailReducer,
    promotionReducer,
    searchReducer,
    notificationReducer,
    voucherReducer,
    generalReducer
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
