import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import DataStorage from '../expand/data/DataStore';

const KEY = 'save';

export default class FetchDemoRact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: '',
      inputValue: '',
    };
    this.dataStorage = new DataStorage();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  handleInputChange(inputValue) {
    this.setState({ inputValue });
  }
  loadData() {
    const { inputValue } = this.state;
    let url = `https://api.github.com/search/repositories?q=${inputValue}`;
    this.dataStorage
      .fetchData(url)
      .then(data => {
        let showData = `初始加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data)}`;
        this.setState({
          showText: showData,
        });
      })
      .catch(err => err && console.log(err.toString()));
  }

  render() {
    const { inputValue, showText } = this.state;
    return (
      <View style={styles.container}>
        <Text>离线缓存框架设计</Text>
        <TextInput
          value={inputValue}
          style={styles.input}
          onChangeText={text => this.handleInputChange(text)}
        />
        <Text
          onPress={() => {
            this.loadData();
          }}
        >
          获取
        </Text>
        <Text>{showText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
  },
});
