import { combineReducers } from 'redux';
import { loginReducer } from '@app/container/login/reducer';
import { authenReducer } from '@app/container/splash/reducer';
// import { orderSuccessReducer } from '../container/OrderSuccess/reducer';
import { categoryReducer } from '@app/container/group/reducer';
import { homeReducer } from '@app/container/product/reducer';
import { menuReducer } from '@app/components/NavMenu/reducer';
import { productDetailReducer } from '@app/container/productDetail/reducer';
import { promotionReducer } from '@app/container/promotion/reducer';
import { searchReducer } from '@app/container/search/reducer';
import { generalReducer } from './generalReducer';
import { cartReducer } from './cartReducer';
import { voucherReducer } from '../../container/useVoucher/reducer';

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
