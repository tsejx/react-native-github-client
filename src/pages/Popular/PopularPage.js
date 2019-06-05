import React, { Component } from 'react';
import { View, StyleSheet, DeviceInfo } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import BaseComponent from 'base/BaseComponent';
import PopularTabPage from './PopularTabPage';
import Request from '../../effects/Request';
import { FLAG_STORAGE } from 'constants/flag';
import NavigationBar from 'components/NavigationBar/index';

function getSearchUrl(tab) {
  const URL = 'https://api.github.com/search/repositories?q=';
  const QUERY_STR = '&sort=starts';
  return URL + tab + QUERY_STR;
}

const THEME_COLOR = '#678';

type Props = {};
export default class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};

    // this.dataRequest = new Request(FLAG_STORAGE.popular);

    // 生产环境下通常是服务器下发的
    this.tabData = ['JavaScript', 'CSS', 'React', 'Vue', 'AntDesign'];
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
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
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
      <NavigationBar title="Popular" statusBar={statusBar} style={{ backgroundColor: THEME_COLOR }} />
    );

    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this.generateTabPage(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
        },
        style: {
          backgroundColor: '#678',
          height: 30,
        },
        indicatorStyle: styles.indicatorStyle,
        labelStyle: styles.labelStyle,
      })
    );

    return (
      <View style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0 }}>
        {navigationBar}
        <TabNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    // minWidth: 50,
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
