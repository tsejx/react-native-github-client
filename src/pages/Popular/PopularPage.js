import React, { Component } from 'react';
import { View, StyleSheet, DeviceInfo } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import NavigationBar from 'components/NavigationBar';
import PopularTabPage from './PopularTabPage';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // 生产环境下通常是服务器下发的
    this.tabData = ['JavaScript', 'CSS', 'React', 'Vue'];
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
          // 是否允许在标签页之间滑动
          swipeEnabled: true,
          // 是否在更改标签页时进行动画处理
          animationEnabled: true,
          // 标签高亮时才渲染页面
          lazy: true,
          // 标签栏配置
          tabBarOptions: {
            // 是否使标签大写
            upperCaseLabel: false,
            // 是否支持选项卡滚动
            scrollEnabled: true,
            // TabBar样式
            style: styles.tabBarStyle,
            // 选项卡标签样式
            labelStyle: styles.labelStyle,
            // 选项卡指示器样式
            indicatorStyle: styles.indicatorStyle,
            // 选项卡样式
            tabStyle: styles.tabStyle,
          },
        })
      );
    }
    return this.tabNav;
  }

  render() {
    let navigationBar = (
      <NavigationBar
        title="Explore"
        hide={false}
        statusBar={{
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
  },
  tabStyle: {
    padding: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'red',
  },
  labelStyle: {
    lineHeight: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  tabBarStyle: {
    backgroundColor: '#0557FF',
    // 修复开启ScrollEnabled后在Android上初次加载时闪烁问题
    height: 36,
  },
});
