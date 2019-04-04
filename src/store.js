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

    // console.log('configure store entering');
    // if (module.hot) {
    //     console.log('hot replace reducers');
    //     let accept = module.hot.accept('indexReducer', () => {
    //         console.log('module hot accept callback', accept);
    //         const nextRootReducer = require('indexReducer');
    //         store.replaceReducer(nextRootReducer.default);
    //     });
    // }
    return store;
}