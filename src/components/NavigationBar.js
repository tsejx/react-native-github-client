import React, { Component } from 'react';
import {
  View,
  Text,
  ViewPropTypes,
  StatusBar,
  StyleSheet,
  Platform,
  DeviceInfo,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 导航栏在iOS中的高度
const NAV_BAR_HEIGHT_IOS = 88;
// 导航栏在Android中的高度
const NAV_BAR_HEIGHT_ANDROID = 64;
// 状态栏的高度
const STATUS_BAR_HEIGHT = 32;

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
    const { leftButton, rightButton } = this.props;

    let statusBar = !this.props.statusBar.hidden ? (
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} />
      </View>
    ) : null;

    let titleView = this.props.titleView ? (
      this.props.titleView
    ) : (
      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.title, this.props.titleStyle]}>
        {this.props.title}
      </Text>
    );

    const navBarStyle = leftButton || rightButton ? styles.navBarSecondary : styles.navBarInitial;

    let content = this.props.hide ? null : (
      <View style={styles.navBar}>
        {leftButton && rightButton ? (
          <View style={styles.navBarButtonContainer}>
            {leftButton ? (
              <TouchableOpacity style={{ paddingLeft: 12 }} onPress={leftButton}>
                <Ionicons name="ios-arrow-back" size={26} style={{ color: 'white' }} />
              </TouchableOpacity>
            ) : null}
            {rightButton ? (
              <TouchableOpacity onPress={rightButton}>
                <Ionicons
                  name="md-share"
                  size={26}
                  style={{ color: 'white', opacity: 0.9, marginRight: 10 }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}

        <View style={[styles.navBarTitleContainer, this.props.titleLayout]}>{titleView}</View>
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
    // 用于判断是否为iPhoneX
    paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
    backgroundColor: '#0557FF',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  },
  navBar: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },

  navBarInitial: {
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarSecondary: {
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    // height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS + 10 : NAV_BAR_HEIGHT_ANDROID + 10,
  },


  navBarButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBarTitleContainer: {
    textAlign: 'left',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // position: 'absolute',
    marginLeft: 16,
    marginBottom: 16,
    // right: 40,
    // top: 0,
    // bottom: 0,
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
