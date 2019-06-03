import React, { Component } from 'react';

import { View, Text } from 'react-native';

import Navigator from 'react-native-deprecated-custom-components';

import WelComePage from './WelcomePage';

export default class Setup extends Component {
  _renderScene(route, navigator) {
    let Component = route.component;
    return <Component {...route.params} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator.Navigator
        initialRoute={{
          name: 'WelcomePage',
          component: WelComePage,
        }}
        renderScene={(e, i) => this._renderScene(e, i)}
      />
    );
  }
}
