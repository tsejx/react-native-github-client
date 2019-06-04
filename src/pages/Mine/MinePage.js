import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BaseComponent from '../../base/BaseComponent';
import { connect } from 'react-redux';
import actions from '../../actions';
import NavigationUtil from 'navigator/NavigationUtil';

class MinePage extends BaseComponent {
  render() {
    // const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Profile Page</Text>
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

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinePage);
