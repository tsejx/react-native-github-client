import React, { Component } from 'react';
import { View, Text, ViewPropTypes, StatusBar, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';

// 导航栏在iOS中的高度
const NAV_BAR_HEIGHT_IOS = 44;
// 导航栏在Android中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;
// 状态栏的高度
const STATUS_BAR_HEIGHT = 20;

// 设置状态栏所接受的属性
const StatusBarShape = {
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

export default class NavigationBar extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    leftButton: PropTypes.element,
  };
  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false,
    },
  };

  getButtonElement(data) {
    return <View style={styles.navBarButton}>{data ? data : null}</View>;
  }

  render() {
    let statusBar = !this.props.statusBar.hidden ? (
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} />
      </View>
    ) : null;

    let titleView = this.props.titleView ? (
      this.props.titleView
    ) : (
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
        {this.props.title}
      </Text>
    );

    let content = this.props.hide ? null : (
      <View style={styles.navBar}>
        {/* {this.getButtonElement(this.props.leftButton)} */}
        <View style={[styles.navBarTitleContainer, this.props.titleLayout]}>{titleView}</View>
        {/* {this.getButtonElement(this.props.rightButton)} */}
      </View>
    );

    return (
      <View style={[styles.container, this.props.style]}>
        {statusBar}
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0557FF',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  },
  navBar: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarTitleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'absolute',
    left: 15,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  // 底部按钮
  navBarButton: {
    alignItems: 'center',
  },
});
