import React, { Component } from 'react';
import { View, StyleSheet, DeviceInfo } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import BaseComponent from 'base/BaseComponent';
import TrendingTabPage from './TrendingTabPage';
import Request from '../../effects/Request';
import { FLAG_STORAGE } from 'constants/flag';
import NavigationBar from 'components/NavigationBar/index';

function getSearchUrl(tab) {
  const URL = 'https://api.github.com/trending/';
  const QUERY_STR = '?since=daily';
  return URL + tab + QUERY_STR;
}

const THEME_COLOR = '#678';

type Props = {};
export default class TrendingPage extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};

    // 生产环境下通常是服务器下发的
    this.tabData = ['ALl', 'Java', 'C', 'C#', 'JavaScript'];
  }

  generateTabs() {}

  // loadData(shouldShowLodaing) {
  //   if (shouldShowLodaing) {
  //     this.setState({
  //       isLoading: true,
  //     });
  //   }

  //   let url = getSearchUrl(this.props.tabLabel);

  //   this.dataRequest
  //     .fetchNetRepository(url)
  //     .then(res => {})
  //     .catch(err => {});
  // }

  generateTabPage() {
    const tabs = {};
    this.tabData.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <TrendingTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };

    let navigationBar = (
      <NavigationBar
        title="Trending"
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR }}
      />
    );

    const TabNavigator = createAppContainer(
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

    return (
      <View style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0  }}>
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
