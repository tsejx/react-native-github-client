import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BaseItem from 'components/BaseItem';

export default class PopularItem extends BaseItem {
  toFix(num) {
    if (num < 1000) {
      return num;
    } else {
      return (num / 1000).toFixed(1) + 'k';
    }
  }
  render() {
    const { item } = this.props.item;
    if (!item || !item.owner) return null;
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.title} numberOfLines={2}>
              {item.full_name}
            </Text>
          </View>
          <Text style={styles.description}>
            {item.description ? item.description : 'no description'}
          </Text>
          <View style={styles.subDescription}>
            {item.license && item.license.name ? (
              <Text style={styles.license}>{item.license.name}</Text>
            ) : null}
          </View>
          <View style={styles.statisticContainer}>
            <View style={styles.sep}>
              <Image style={{ height: 22, width: 22 }} source={{ uri: item.owner.avatar_url }} />
            </View>
            <View style={[styles.muted, styles.sep]}>
              <FontAwesome name="star" size={14} style={styles.icon} />
              <Text style={styles.num}>{this.toFix(item.stargazers_count)}</Text>
            </View>
            <View style={[styles.muted, styles.sep]}>
              <AntDesign name="fork" size={14} style={styles.icon} />
              <Text style={styles.num}>{this.toFix(item.forks)}</Text>
            </View>
            {/* 继承自BaseItem的收藏图标的渲染 */}
            {/* {this.renderFavoriteIcon()} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    marginVertical: 3,
    borderColor: '#ddd',
    borderRadius: 12,
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 1.5 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    // 安卓设置阴影
    elevation: 3,
  },
  heading: {
    marginBottom: 8,
  },
  title: {
    lineHeight: 26,
    color: '#0366d6',
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    marginBottom: 12,
    fontSize: 14,
    marginBottom: 16,
    color: '#586069',
  },
  subDescription: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontSize: 13,
    marginBottom: 8,
  },
  license: {
    color: '#586069',
  },
  statisticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  muted: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    color: '#586069',
    marginRight: 4,
  },
  num: {
    color: '#586069',
    fontSize: 14,
  },
  sep: {
    marginRight: 8,
  },
});
