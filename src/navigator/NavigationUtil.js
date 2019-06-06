export default class NavigationUtil {
  /**
   * 返回上一页
   * @param {*} navigation
   */
  static goBack(navigation) {
    navigation.goBack();
  }
  /**
   * 重定向至主页面
   * @param {*} params
   */
  static redirectToHomePage(params) {
    const { navigation } = params;
    navigation.navigate('Main');
  }

  /**
   * 跳转至指定页面
   * @param {*} params 传递参数
   * @param {*} page 跳转页面名称
   */
  static routeTo(params, page) {
    const navigation = NavigationUtil.navigation
    if (!navigation) {
      console.warn('NavigationUtil.navigation can not be null');
      return;
    }
    navigation.navigate(page, { ...params });
  }
}
