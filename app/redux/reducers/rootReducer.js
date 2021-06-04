import { combineReducers } from 'redux';
import { loginReducer } from '@app/container/login/reducer';
import { authenReducer } from '@app/container/splash/reducer';
import { orderSuccessReducer } from './orderSuccessReducer';
import { productDetailReducer } from './productDetailReducer';
import { promotionReducer } from './promotionReducer';
import { homeReducer } from './homeReducer';
import { searchReducer } from './searchReducer';
import { generalReducer } from './generalReducer';
import { categoryReducer } from './groupReducer';
import { cartReducer } from './cartReducer';
import { voucherReducer } from './useVoucherReducer';
import { notificationReducer } from './notificationReducer';
import { locationReducer } from './locationReducer';

const appReducer = combineReducers({
    loginReducer,
    authenReducer,
    cartReducer,
    locationReducer,
    categoryReducer,
    homeReducer,
    productDetailReducer,
    promotionReducer,
    searchReducer,
    notificationReducer,
    voucherReducer,
    generalReducer,
    orderSuccessReducer
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
