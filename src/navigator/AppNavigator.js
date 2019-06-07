import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  // createMaterialTopTabNavigator,
  // createBottomTabNavigatorcreateSwitchNavigator,
} from 'react-navigation';

import WelcomePage from 'pages/Entry/WelcomePage';
import HomePage from 'pages/Entry/HomePage';
import DetailPage from 'pages/Detail/DetailPage';
import FetchDemoPage from 'pages/FetchDemoPage';
import AsyncStorageDemoPage from 'pages/AsyncStorageDemoPage';
import DataStorageDemoPage from 'pages/DataStorageDemoPage';

import {
  createReactNavigationReduxMiddleware,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import navigation from 'constants/navigation'


// 应用初始化页面
const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null,
    },
  },
});

// 应用主页面
const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null,
    },
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null,
    },
  },
  // FetchDemoPage: {
  //   screen: FetchDemoPage,
  //   navigationOptions: {
  //     // header: null,
  //   },
  // },
  // AsyncStorageDemoPage: {
  //   screen: AsyncStorageDemoPage,
  //   navigationOptions: {
  //     // header: null,
  //   },
  // },
  // DataStorageDemoPage: {
  //   screen: DataStorageDemoPage,
  //   navigationOptions: {
  //     // header: null,
  //   },
  // },
});

export const RootNavigator = createAppContainer(
  createSwitchNavigator(
    {
      [navigation.init]: InitNavigator,
      Main: MainNavigator,
    },
    {
      defaultNavigationOptions: {
        // 可以通过将header设为null，来禁用StackNavigation
        header: null,
      },
    }
  )
);

/**
 * 1.初始化react-navigation与redux中间件
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers（行为订阅者）
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(state => state.nav, 'root');

/**
 * 2.将根导航器组件传递给 createReduxContainer 函数,
 * 并返回一个将 navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在 createReactNavigationReduxMiddleware 之后执行
 */
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
  // v2
  state: state.nav,
});

/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);
