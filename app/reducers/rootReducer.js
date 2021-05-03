import { combineReducers } from 'redux';
import { loginReducer } from '../container/login/reducer';
import { authenReducer } from '../container/splash/reducer';

const appReducer = combineReducers({ loginReducer, authenReducer });
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
