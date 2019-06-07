import { combineReducers } from 'redux';
import { RootNavigator } from '../navigator/AppNavigator';
import navigation from 'constants/navigation';
import theme from './theme';
import popular from './popular';
import trending from './trending';

// 1. 指定默认state
// navigation.init是根路由的stackNavigator
const navState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams(navigation.init)
);

/**
 * 2.创建自己的 navigation reducer
 * @param {*} state
 * @param {*} action
 */
const navReducer = (state = navState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  // 如果 `nextState`为 null 或未定义，只需返回原始 `state`
  return nextState || state;
};

/**
 *  3.合并 reducer
 *  @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
  nav: navReducer,
  theme: theme,
  popular: popular,
  trending: trending,
});

export default index;
