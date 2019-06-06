import React, { Component } from 'react';
import { Text, View, StyleSheet, DeviceInfo, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import BaseComponent from 'base/BaseComponent';
import TrendingTabPage from './TrendingTabPage';
import Request from '../../effects/Request';
import { FLAG_STORAGE } from 'constants/flag';
import NavigationBar from 'components/NavigationBar/index';
import TrendingDialog, { TimeSpans } from '../../components/TrendingDialog/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function getSearchUrl(tab) {
  const URL = 'https://api.github.com/trending/';
  const QUERY_STR = '?since=daily';
  return URL + tab + QUERY_STR;
}

const THEME_COLOR = '#678';
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: '400' }}>
              趋势{this.state.timeSpan.showText}
            </Text>
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
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab)
  }

  renderTrendingDialog() {
    return (
      <TrendingDialog
        ref={dialog => (this.dialog = dialog)}
        onSelect={tab => this.onSelectTimeSpan(tab)}
      />
    );
  }

  generateTabs() {}

  generateTabPage() {
    const tabs = {};
    this.tabData.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <TrendingTabPage {...props} tabLabel={item} timeSpan={this.state.timeSpan} />,
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  }

  renderTabNav(){
    if (!this.tabNav)
    // 这样TabNavigator就不用每次都要重复创建，只有初始化和改变Tab的时候才会重新创建
    this.tabNav = createAppContainer(
      createMaterialTopTabNavigator(this.generateTabPage(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
        },
        indicatorStyle: styles.indicatorStyle,
        labelStyle: styles.labelStyle,
      })
    );
    return this.tabNav
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };

    let navigationBar = (
      <NavigationBar
        titleView={this.renderTitleView()}
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR }}
      />
    );

  const TabNavigator = this.renderTabNav();

    return (
      <View style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0 }}>
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
  tabStyle: {
    // minWidth: 50,
    padding: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
});
