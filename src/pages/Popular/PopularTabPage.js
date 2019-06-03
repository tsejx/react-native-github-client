import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import NavigationUtil from 'navigator/NavigationUtil';

type Props = {};
export default class PopularTabPage extends Component<Props> {
  render() {
    const { tabLabel } = this.props;

    return (
      <View style={styles.container}>
        <Text>{tabLabel}</Text>
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
  welcome: {},
});
