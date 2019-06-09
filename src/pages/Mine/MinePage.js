import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../actions';
import NavigationUtil from 'navigator/NavigationUtil';
import NavigationBar from 'components/NavigationBar';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import ProfileItem from 'components/ProfileItem';

const THEME_COLOR = '#678';

const menu = [
  {
    title: 'Trending',
    children: [
      {
        title: 'Custom Language',
        route: '',
        Icon: Ionicons,
        iconType: 'md-checkbox-outline',
      },
      {
        title: 'Sort Language',
        route: '',
        Icon: MaterialIcons,
        iconType: 'language',
      },
    ],
  },
  {
    title: 'Discover',
    children: [
      {
        title: 'Custom Label',
        route: '',
        Icon: Ionicons,
        iconType: 'md-checkbox-outline',
      },
      {
        title: 'Sort Label ',
        route: '',
        Icon: MaterialCommunityIcons,
        iconType: 'sort',
      },
      {
        title: 'Remove Label',
        route: '',
        Icon: Ionicons,
        iconType: 'md-remove',
      },
    ],
  },
  {
    title: 'Setting',
    children: [
      {
        title: 'Custom Theme',
        route: '',
        Icon: Ionicons,
        iconType: 'ios-color-palette',
      },
      {
        title: 'About Author',
        route: '',
        Icon: Octicons,
        iconType: 'smiley',
      },
      {
        title: 'Feedback',
        route: '',
        Icon: MaterialIcons,
        iconType: 'feedback',
      },
    ],
  },
];

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

  renderProfileMenu() {
    return menu.map(md => {
      return (
        <View key={md.title}>
          <View style={styles.seperator} />
          <Text style={styles.moduleTitle}>{md.title}</Text>
          {md.children.map(menuItem => {
            return (
              <>
                <View style={styles.seperator} />
                <ProfileItem
                  text={menuItem.title}
                  IconCom={menuItem.Icon}
                  iconType={menuItem.iconType}
                  onPress={() => {}}
                />
              </>
            );
          })}
        </View>
      );
    });
  }

  render() {
    let navigationBar = (
      <NavigationBar
        title="Profile"
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content',
        }}
      />
    );
    return (
      <View style={styles.container}>
        {navigationBar}
        <ScrollView>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {

            }}
          >
            <View style={styles.userIcon}>
              <AntDesign
                name="github"
                size={40}
                style={{
                  marginRight: 10,
                  color: '#000000',
                }}
              />
              <Text>GitHub Profile</Text>
            </View>
            <AntDesign
              name="right"
              size={16}
              style={{
                marginRight: 10,
                alignSelf: 'center',
                color: '#0557FF',
              }}
            />
          </TouchableOpacity>

        {this.renderProfileMenu()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  userIcon: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  seperator: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  moduleTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray',
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
