/**
 * Android 物理回退键处理
 */
 import React from 'react';
import { BackHandler } from 'react-native';

export default class AndroidPhysicsKey {
  constructor(props) {
    this.props = props;
    this._hardwareBackPress = this.onHardwareBackPress.bind(this);
  }
  componentDidMount() {
    if (this.props.backPress) {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
  }
  componentWillUnmount() {
    if (this.props.backPress) {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
  }
  onHardwareBackPress(e) {
    return this.props.backPress(e);
  }
}
