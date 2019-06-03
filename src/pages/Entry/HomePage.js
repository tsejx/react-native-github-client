import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  DeviceEventEmitter,
  Alert,
  Dimensions,
  BackHandler,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
// Tab 栏跳转页面
import TabNavigator from 'react-native-tab-navigator';
// 业务页面
// import PopularPage from 'page/Popular/PopularPage';
// import TrendingPage from 'page/Trending/TrendingPage';
// import FavoritePage from 'page/Favorite/FavoritePage';
// import MinePage from 'page/Mine/MinePage';

import BaseComponent from 'base/BaseComponent';

import { DURATION } from 'react-native-easy-toast';

import { connect } from 'react-redux'

// import { SafeAreaView, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import DynamicTabNavigator from 'navigator/DynamicTabNavigator';
import NavigationUtil from 'navigator/NavigationUtil';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';

// 获取视窗宽高
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

//需要导出的常量
export const ACTION_HOME = { A_SHOW_TOAST: 'showToast', A_RESTART: 'restart', A_THEME: 'theme' };

export const FLAG_TAB = {
  flag_popularTab: 'flag_popularTab',
  flag_trendingTab: 'flag_trendingTab',
  flag_favoriteTab: 'flag_favoriteTab',
  flag_myTab: 'flag_myTab',
};

class HomePage extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  /**
   * 处理安卓物理返回键
   * @return {boolean}
   */
  onBackPress = () => {
    const { dispatch, nva } = this.props;
    // if (nav.index === 0) {}
    if ((nav, routes[1].index === 0)) {
      // 如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
  render() {
    // 保存外层Navigator
    NavigationUtil.navigation = this.props.navigation;

    // const Tab = this.renderTabNavigator();

    return <DynamicTabNavigator />;
  }
}

// <View style={styles.container}>
//   <Text>Home Page</Text>
// </View>

// export default class HomePage extends BaseComponent {
//   constructor(props) {
//     super(props);

//     let selectedTab = this.props.selectedTab ? this.props.selectedTab : FLAG_TAB.flag_popularTab;

//     this.state = {
//       selectedTab: selectedTab,
//       // theme: this.props.theme,
//     };
//   }

//   componentDidMount() {
//     super.componentDidMount();
//     this.listener = DeviceEventEmitter.addListener('ACTION_HOME', (action, params) =>
//       this.onAction(action, params)
//     );
//   }

//   onAction(action, params) {
//     if (action === ACTION_HOME.A_RESTART) {
//       this.onRestart(params);
//     } else if (action === ACTION_HOME.A_SHOW_TOAST) {
//       this.toast.show(params.text, DURATION.LENGTH_LONG);
//     } else {
//     }
//   }

//   // onRestart(jumpToTap) {
//   //   Alert.alert(jumpToTap);
//   //   this.props.navigator.resetTo({
//   //     component: HomePage,
//   //     params: {
//   //       ...this.props,
//   //       theme: this.state.theme,
//   //       selectedTab: jumpToTap,
//   //     },
//   //   });
//   // }

//   // componentWillUnmount() {
//   //   super.componentWillUnmount();
//   //   if (this.listener) {
//   //     this.listener.remove();
//   //   }
//   // }

//   // onSelected(selectedTab) {
//   //   this.setState({
//   //     selectedTab: selectedTab,
//   //   });
//   // }

//   // renderTab(Component, selectedTab, title, renderIcon) {
//   //   return (
//   //     <TabNavigator.Item
//   //       selected={this.state.selectedTab === selectedTab}
//   //       title={title}
//   //       selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
//   //       renderIcon={() => <Image style={styles.tabItemImageStyle} source={renderIcon} />}
//   //       renderSelectedIcon={() => (
//   //         <Image
//   //           style={[styles.tabItemImageStyle, this.state.theme.styles.tabBarSelectedIcon]}
//   //           source={renderIcon}
//   //         />
//   //       )}
//   //       onPress={() => this.onSelected(selectedTab)}
//   //     >
//   //       <Component {...this.props} theme={this.state.theme} homeComponent={this} />
//   //     </TabNavigator.Item>
//   //   );
//   // }

//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text>Home Page</Text>
//         {/* <TabNavigator tabBarStyle={{ opacity: 0.9 }} sceneStyle={{ paddingBottom: 0 }}>
//           {this.renderTab(
//             PopularPage,
//             FLAG_TAB.flag_popularTab,
//             'Popular',
//             require('../../../res/images/ic_polular.png')
//           )}
//           {this.renderTab(
//             TrendingPage,
//             FLAG_TAB.flag_trendingTab,
//             'Trending',
//             require('../../../res/images/ic_trending.png')
//           )}
//           {this.renderTab(
//             FavoritePage,
//             FLAG_TAB.flag_favoriteTab,
//             'Favorite',
//             require('../../../res/images/ic_favorite.png')
//           )}
//           {this.renderTab(
//             MinePage,
//             FLAG_TAB.flag_myTab,
//             'Mine',
//             require('../../../res/images/ic_my.png')
//           )}
//         </TabNavigator> */}
//       </SafeAreaView>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  tabItemImageStyle: {
    width: 24,
    height: 24,
  },
});

const mapStateToProps = state => ({
  nav: state.nav
});
export default connect(
  mapStateToProps,
)(HomePage);