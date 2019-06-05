import React, { Component } from 'react';
import { View } from 'react-native';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs';

import PopularPage from 'pages/Popular/PopularPage';
import TrendingPage from 'pages/Trending/TrendingPage';
import FavoritePage from 'pages/Favorite/FavoritePage';
import MinePage from 'pages/Mine/MinePage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


import { connect } from 'react-redux';

const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '流行',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons name="whatshot" size={26} style={{ color: tintColor }} />
      ),
    },
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name="md-trending-up" size={26} style={{ color: tintColor }} />
      ),
    },
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <Entypo name="heart" size={26} style={{ color: tintColor }} />
      ),
    },
  },
  MinePage: {
    screen: MinePage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <Entypo name="user" size={26} style={{ color: tintColor }} />
      ),
    },
  },
};

class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  renderTabNavigator() {
    // 优化，避免重复触发renderTabNavigator
    if (this.Tabs) {
      return this.Tabs;
    }
    const { PopularPage, TrendingPage, FavoritePage, MinePage } = TABS;

    // 根据需要定制显示的Tab
    const tabs = { PopularPage, TrendingPage, FavoritePage, MinePage };

    // 动态配置Tab属性
    PopularPage.navigationOptions.tabBarLabel = '探索';

    return (this.Tabs = createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: props => {
          return <TabBarComponent theme={this.props.theme} {...props} />;
        },
      })
    ));
  }
  render() {
    const Tab = this.renderTabNavigator();
    return <Tab />;
  }
}

class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activateTintColor,
      updatedTime: new Date().getTime(),
    };
  }
  render() {
    // const { routes, index } = this.props.navigation.state;
    // if (routes[index].params) {
    //   const { theme } = routes[index].params;
    //   if (theme && theme.updatedTime > this.theme.updatedTime) {
    //     this.theme = theme;
    //   }
    // }

    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.props.theme}
        // activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);
