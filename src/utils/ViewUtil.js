import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {
  /**
   * 获取左侧返回按钮
   * @static
   * @param  {any} callback
   * @return
   * @memberof ViewUtil
   */
  static getLeftBackButton(callback) {
    return (
        <div></div>
    );
  }

  /**
   * 获取分享按钮
   * @static
   * @param  {any} callback
   * @return
   * @memberof ViewUtil
   */
  static getShareButton(callback) {
    return (
      <TouchableOpacity>
        <Ionicons
          name="md-share"
          size={26}
          style={{ color: 'white', opacity: 0.9, marginRight: 10 }}
        />
      </TouchableOpacity>
    );
  }
}
