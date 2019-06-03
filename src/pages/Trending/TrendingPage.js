import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BaseComponent from '../../base/BaseComponent';
import { connect } from 'react-redux';
import actions from '../../actions/index';

class TrendingPage extends BaseComponent {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Trending Page</Text>
        <Button
          title="改变主题色"
          onPress={() => {
            this.props.onThemeChange('#096');
            // navigation.setParams({
            //   theme: {
            //     tintColor: 'red',
            //     updatedTime: new Date().getTime(),
            //   },
            // });
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
)(TrendingPage);
