import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';

import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

import BaseComponent from 'base/BaseComponent';

import PopularTabPage from './PopularTabPage';

import Request from '../../effects/Request';

import { FLAG_STORAGE } from 'constants/flag';

function getSearchUrl(tab) {
  const URL = 'https://api.github.com/search/repositories?q=';
  const QUERY_STR = '&sort=starts';
  return URL + tab + QUERY_STR;
}

type Props = {};
export default class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};

    // this.dataRequest = new Request(FLAG_STORAGE.popular);

    // 生产环境下通常是服务器下发的
    this.tabData = ['JavaScript', 'Java', 'Go', 'Object-C', 'Python'];
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
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        this.generateTabPage(),
        {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,
            scrollEnabled: true,
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
        }
      )
    );

    return (
      <View style={styles.container}>
        <TabNavigator />
        <Text>Hello Popular Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 31,
  },
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
  },
});
