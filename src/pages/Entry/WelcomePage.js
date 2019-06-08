/**
 * 欢迎页
 * @flow
 * **/
import React, { Component } from 'react';
import { StyleSheet, View, Text, InteractionManager, Platform } from 'react-native';
import NavigationUtil from 'navigator/NavigationUtil';

type Props = {};
export default class WelcomePage extends Component<Props> {
  componentDidMount() {
    console.log('Welcome Page ComponentDidMount');
    this.timer = setTimeout(() => {
      NavigationUtil.redirectToHomePage({
        navigation: this.props.navigation,
      });
    }, 500);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>欢迎页</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
