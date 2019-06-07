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
    return <DynamicTabNavigator />;
  }
}

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