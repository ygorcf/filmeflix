import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer from './reducers'

export default (preloadedState?: Object) => {
    const middlewareEnhancer = applyMiddleware(thunkMiddleware)
    const composedEnhancers = composeWithDevTools(middlewareEnhancer)

    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    if (process.env.NODE_ENV !== 'production' && 'hot' in module) {
        (module as any).hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }

    return store
}
