import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView, TouchableOpacity, DeviceInfo } from 'react-native';
import NavigationBar from 'components/NavigationBar';
import ViewUtil from '../../utils/ViewUtil';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AndroidPhysicsKey from 'components/AndroidPhysicsKey';
import NavigationUtil from '../../navigator/NavigationUtil';

const prefixGithubUrl = 'https://github.com/';
const THEME_COLOR = '#678';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;

    const { projectModel } = this.params;

    this.url = projectModel.html_url || prefixGithubUrl + projectModel.fullName;
    const title = projectModel.full_name || projectModel.fullName;
    console.log('detailPage', this.props.navigation)
    this.state = {
      title: title,
      url: this.url,
      canGoBack: false,
    };

    this.backPress = new AndroidPhysicsKey({ backPress: () => this.onBackPress() });
  }
  componentDidMount() {
    this.backPress.componentDidMount();
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    this.onBack();
    return true;
  }
  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack();
    } else {
      NavigationUtil.goBack(this.props.navigation);
    }
  }

  renderRightButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome name="star-o" size={20} style={{ color: '#fff', marginRight: 10 }} />
        </TouchableOpacity>
      </View>
    );
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
    });
  }

  render() {
    // 为了防止顶部标题与图标冲突，预留安全区域
    const titleLayoutStyle = this.state.title.length > 20 ? { paddingRight: 30 } : null;

    let navigationBar = (
      <NavigationBar
        title={this.state.title}
        titleLayoutStyle={titleLayoutStyle}
        leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        rightButton={this.renderRightButton()}
        style={{ backgroundColor: THEME_COLOR }}
      />
    );

    return (
      <View style={styles.container}>
        {navigationBar}
        <WebView
          ref={webView => (this.webView = webView)}
          startInLoadingState={true}
          source={{ uri: this.state.url }}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
