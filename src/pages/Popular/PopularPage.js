import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import BaseComponent from '../../base/BaseComponent';

import DataRequest, { FlAG_STORAGE } from '../../dao/DataRequest';

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=starts'

export default class PopularPage extends BaseComponent {
  constructor(props) {
    super(props);

    this.dataRequest = new DataRequest(FlAG_STORAGE.flag_popular);

    this.state = {};
  }

  componentDidMount(){
    this.loadData()
  }

  loadData(shouldShowLodaing) {
    if(shouldShowLodaing){
        this.setState({
            isLoading: true
        })
    }

    let url = URL + this.props.tabLabel + QUERY_STR;

    this.dataRequest.fetchNetRepository(url)
        .then(res => {

        })
        .catch(err => {

        })
  }

  render() {
    return (
      <View>
        <FlatList
          data={[{ key: 'a' }, { key: 'b' }]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
          enableEmptySections={true}
        />
      </View>
    );
  }
}
