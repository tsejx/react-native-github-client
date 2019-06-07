import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../actions';
import NavigationUtil from 'navigator/NavigationUtil';
import NavigationBar from 'components/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
const THEME_COLOR = '#678';
class MinePage extends Component {
  getRightButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{ padding: 5, marginRight: 8 }}>
            <Feather name={'search'} size={24} style={{ color: '#fff' }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  getLeftButton(callback) {
    return (
      <TouchableOpacity style={{ padding: 8, paddingLeft: 12 }} onPress={callback}>
        <Ionicons name="ios-arrow-back" size={26} style={{ color: 'white' }} />
      </TouchableOpacity>
    );
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title="Profile"
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR }}
        rightButton={this.getRightButton()}
        leftButton={this.getLeftButton()}
      />
    );
    return (
      <View style={{ flex: 1 }}>
        {navigationBar}
        <Text>MyPage</Text>
        <View style={styles.container}>
          <Button
            title="改变主题色"
            onPress={() => {
              this.props.onThemeChange('orange');
              // navigation.setParams({
              //   theme: {
              //     tintColor: 'orange',
              //     updatedTime: new Date().getTime(),
              //   },
              // });
            }}
          />
          <Text
            onPress={() => {
              NavigationUtil.routeTo(
                {
                  navigation: this.props.navigation,
                },
                'DetailPage'
              );
            }}
          >
            跳转到详情页
          </Text>
          <Button
            title="Fetch"
            onPress={() => {
              NavigationUtil.routeTo(
                {
                  navigation: this.props.navigation,
                },
                'FetchDemoPage'
              );
            }}
          />
          <Button
            title="AsyncStorage"
            onPress={() => {
              NavigationUtil.routeTo(
                {
                  navigation: this.props.navigation,
                },
                'AsyncStorageDemoPage'
              );
            }}
          />
          <Button
            title="离线缓存框架"
            onPress={() => {
              NavigationUtil.routeTo(
                {
                  navigation: this.props.navigation,
                },
                'DataStorageDemoPage'
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinePage);
