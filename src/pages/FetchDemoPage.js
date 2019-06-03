import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import BaseComponent from '../base/BaseComponent';
import { connect } from 'react-redux';

export default class FetchDemoRact extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      showText: '',
      inputValue: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  handleInputChange(inputValue) {
    this.setState({ inputValue });
  }
  loadData() {
    const { inputValue } = this.state;
    let url = `https://api.github.com/search/repositories?q=${inputValue}`;
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.text();
        }
        throw new Error('Network response wase not ok.');
      })
      .then(res => {
        this.setState({
          showText: res,
        });
      })
      .catch(err => {
        this.setState({
          showText: err.toStrinng(),
        });
      });
  }
  render() {
    const { inputValue, showText } = this.state;
    return (
      <View style={styles.container}>
        <Text>Favorite Page</Text>
        <View style={styles.input_container}>
          <TextInput
            value={inputValue}
            style={styles.input}
            onChangeText={text => this.handleInputChange(text)}
          />
        </View>
        <Button title="获取" onPress={() => this.loadData()} />
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
  },
  input: {
    height: 30,
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
  },
});
