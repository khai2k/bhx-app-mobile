import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { rootReducer } from '@app/redux/reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger();
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, loggerMiddleware))
);
