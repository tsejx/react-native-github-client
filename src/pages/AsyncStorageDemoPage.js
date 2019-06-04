import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, AsyncStorage } from 'react-native';
import BaseComponent from '../base/BaseComponent';
import { connect } from 'react-redux';

const KEY = 'save';

export default class FetchDemoRact extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      showText: '',
      inputValue: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(inputValue) {
    this.setState({ inputValue });
  }
  /**
   * 储存数据
   * @returns {Promise<void>}
   */
  async doSave() {
    const { inputValue } = this.state;
    // 用法一
    AsyncStorage.setItem(KEY, inputValue, err => {
      err && console.log(err.toString());
    });
    // 用法二
    // AsyncStorage.setItem(KEY, this.value)
    //   .cache(error => {
    //     error && console.log(error.toString())
    //   });
    // 用法三
    // try {
    //   await AsyncStorage.setItem(KEY, this.value)
    // } catch (error) {
    //   error && console.log(error.toString())
    // }
  }

  /**
   * 删除数据
   * @returns {Primise<void>}
   */
  async doRemove() {
    // 用法一
    AsyncStorage.removeItem(KEY, err => {
      err && console.log(err.toString());
    });
    // 用法二
    // AsyncStorage.removeItem(KEY)
    //   .catch(error => {
    //     error && console.log(error.toString())
    //   })
    // 用法三
    // try {
    //   await  AsyncStorage.removeItem(KEY)
    // } catch (error) {
    //   error && console.log(error.toString())
    // }
  }

  /**
   * 获取数据
   * @returns {Promise<boid>}
   */
  async getDate() {
    // 用法一
    AsyncStorage.getItem(KEY, (err, value) => {
      this.setState({
        showText: value,
      });
      console.log(value);
      err && console.log(err.toString());
    });
    // 用法二
    // AsyncStorage.getItem(KEY)
    //   .then(value => {
    //     this.setState({
    //       showText: value
    //     });
    //     console.log(value);
    //   })
    //   .catch(error => {
    //     error && console.log(error.toString())
    //   });
    // 用法三
    // try {
    //   const value = await AsyncStorage.getItem(KEY)
    //   this.setState({
    //     showText: value
    //   });
    //   console.log(value);
    // } catch (error) {
    //   error && console.log(error.toString())
    // }
  }

  render() {
    const { inputValue, showText } = this.state;
    return (
      <View style={styles.container}>
        <Text>本地化数据库储存</Text>
        <TextInput
          value={inputValue}
          style={styles.input}
          onChangeText={text => this.handleInputChange(text)}
        />
        <View style={styles.input_container}>
          <Text
            onPress={() => {
              this.doSave();
            }}
          >
            存储
          </Text>
          <Text
            onPress={() => {
              this.doRemove();
            }}
          >
            删除
          </Text>
          <Text
            onPress={() => {
              this.getDate();
            }}
          >
            获取
          </Text>
        </View>
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
