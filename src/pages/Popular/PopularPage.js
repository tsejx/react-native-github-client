import React, { Component } from 'react';
import { View, StyleSheet, DeviceInfo } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import NavigationBar from 'components/NavigationBar';
import PopularTabPage from './PopularTabPage';
import theme from 'constants/theme';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // 生产环境下通常是服务器下发的
    this.tabData = ['JavaScript', 'CSS'];
  }

  generateTabPage() {
    const tabs = {};
    this.tabData.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  }

  renderTabNav() {
    if (!this.tabNav) {
      this.tabNav = createAppContainer(
        createMaterialTopTabNavigator(this.generateTabPage(), {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,
            scrollEnabled: true,
          },
          style: {
            backgroundColor: '#fff',
            height: 30,
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
        })
      );
    }
    return this.tabNav;
  }

  render() {
    let navigationBar = (
      <NavigationBar
        title="Popular"
        hide={false}
        statusBar={{
          backgroundColor: theme.THEME_COLOR,
          barStyle: 'light-content',
        }}
      />
    );

    const TabNavigator = this.renderTabNav();

    return (
      <View style={styles.container}>
        {navigationBar}
        <TabNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 用于判断是否为iPhoneX
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
  },
  tabStyle: {
    padding: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff',
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
});
