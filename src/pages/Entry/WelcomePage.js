/**
 * 欢迎页
 * @flow
 * **/
import React, { Component } from 'react';
import { StyleSheet, View, Text, InteractionManager, Platform, Alert } from 'react-native';
import NavigationUtil from 'navigator/NavigationUtil';

// import HomePage from './HomePage';
// import Theme from '../../effects/Theme';


type Props = {};
export default class WelcomePage extends Component<Props> {
  componentDidMount() {
    // new Theme().getTheme().then(data => {
    //   this.theme = data;
    // });

    // Alert.alert(this.props)

    this.timer = setTimeout(() => {
      // 执行耗时较长的同步执行任务
      // InteractionManager.runAfterInteractions(() => {
      //   navigator.resetTo({
      //     component: HomePage,
      //     name: 'HomePage',
      //     params: {
      //       theme: this.theme,
      //     },
      //   });
      // });
      NavigationUtil.redirectToHomePage({
        navigation: this.props.navigation
      })
    }, 200);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello ReactNative</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
