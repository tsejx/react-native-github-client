import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';
import BaseItem from 'components/BaseItem';

export default class TrendingItem extends BaseItem {
  render() {
    const { data } = this.props;
    if (!data) return null;

    let description = '<p>' + data.description + '</p>';

    return (
      <TouchableOpacity key={data.fullName} onPress={this.props.onSelect}>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.title} numberOfLines={2}>
              {data.fullName}
            </Text>
          </View>

          {/* 解析HTML */}
          <HTMLView value={description} onLinkPress={url => {}} shtylesheet={htmlStyle} />

          <Text style={styles.subDescription}>{data.meta}</Text>

          <View style={styles.statisticContainer}>
            <View style={styles.seq}>
              {data.contributors.map((res, index, arr) => {
                return (
                  <Image
                    style={{ height: 22, width: 22, margin: 2 }}
                    source={{ uri: arr[index] }}
                  />
                );
              })}
            </View>
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
    fontSize: 14,
    marginBottom: 16,
    color: '#586069',
  },
  subDescription: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontSize: 13,
    marginTop: 16,
    marginBottom: 8,
    color: '#586069',
  },
  statisticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  sep: {
    marginRight: 8,
  },
});

const htmlStyle = StyleSheet.create({
  p: {
    fontSize: 14,
    marginBottom: 16,
    color: '#586069',
  },
});
