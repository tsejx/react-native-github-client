/**
 * 欢迎页
 * @flow
 * **/
import React, { Component } from 'react';
import { StyleSheet, View, Text, InteractionManager, Platform, Alert } from 'react-native';
import NavigationUtil from 'navigator/NavigationUtil';

type Props = {};
export default class WelcomePage extends Component<Props> {
  componentDidMount() {
    this.timer = setTimeout(() => {
      NavigationUtil.redirectToHomePage({
        navigation: this.props.navigation,
      })
    }, 100);
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
