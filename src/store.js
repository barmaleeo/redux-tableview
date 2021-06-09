import rootReducer from './indexReducer'

import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import DevTools from './DevTools.jsx'
import * as initActions from './initActions'


export default function configureStore(initialState) {
    const logger = createLogger();
    const store = createStore(rootReducer, initialState,
        compose(applyMiddleware(thunk, logger), DevTools.instrument())
    );

    store.dispatch(initActions.init());
    return store;
}