import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  DeviceInfo,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import TrendingTabPage from './TrendingTabPage';
import NavigationBar from 'components/NavigationBar';
import TrendingDialog, { TimeSpans } from 'components/TrendingDialog';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';

type Props = {};
export default class TrendingPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      timeSpan: TimeSpans[0],
    };

    // 生产环境下通常是服务器下发的
    this.tabData = ['All', 'Java', 'C', 'C#', 'JavaScript'];
  }

  renderTitleView() {
    return (
      <View>
        <TouchableOpacity
          ref={'button'}
          underlayColor="transparent"
          onPress={() => this.dialog.show()}
        >
          <View style={styles.tabHeaderContainer}>
            <Text style={styles.tabHeaderTitle}>Trending</Text>
            <Text style={styles.tabHeaderSelector}>{this.state.timeSpan.showText}</Text>
            <MaterialIcons name="arrow-drop-down" size={22} style={{ color: 'white' }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  onSelectTimeSpan(tab) {
    this.dialog.dismiss();
    this.setState({
      timeSpan: tab,
    });
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);
  }

  renderTrendingDialog() {
    return (
      <TrendingDialog
        ref={dialog => (this.dialog = dialog)}
        onSelect={tab => this.onSelectTimeSpan(tab)}
      />
    );
  }

  generateTabPage() {
    const tabs = {};
    this.tabData.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => (
          <TrendingTabPage {...props} tabLabel={item} timeSpan={this.state.timeSpan} />
        ),
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  }

  renderTabNav() {
    if (!this.tabNav)
      // 这样TabNavigator就不用每次都要重复创建，只有初始化和改变Tab的时候才会重新创建
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
    return this.tabNav;
  }

  render() {
    let navigationBar = (
      <NavigationBar
        titleView={this.renderTitleView()}
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
        {this.renderTrendingDialog()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabHeaderTitle: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tabHeaderSelector: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 16,
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
