import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';
import { middleware } from 'navigator/AppNavigator';

/**
 * 自定义 Redux 中间件
 * @param {*} store
 */
const logger = store => next => action => {
    if (typeof action === 'function'){
        console.log('<===dispatching a function===>')
    } else {
        console.log('dispatching', action)
    }
    const result = next(action);
    console.log('nextState', result, store.getState());
}

const middlewares = [middleware, logger, thunk];

// 创建 Store
export default createStore(reducers, applyMiddleware(...middlewares));
