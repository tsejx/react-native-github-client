import React, { Component } from 'react';
import { Modal, Text, StatusBar, StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimeSpan from '../model/TimeSpan';
export const TimeSpans = [
  new TimeSpan('Daily', 'since=daily'),
  new TimeSpan('Weekly', 'since=weekly'),
  new TimeSpan('Monthly', 'since=monthly'),
];

export default class TrendingDialog extends Component {
  state = {
    visible: false,
  };

  show() {
    this.setState({
      visible: true,
    });
  }

  dismiss() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { onClose, onSelect } = this.props;

    return (
      <Modal transparent={true} visible={this.state.visible} onRequestClose={() => onClose}>
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.dismiss()}>
          <MaterialIcons name="arrow-drop-up" size={36} style={styles.arrow} />
          <View style={styles.content}>
            {TimeSpans.map((res, index, arr) => {
              return (
                <TouchableOpacity onPress={() => onSelect(arr[index])} underlayColor="transparent">
                  <View style={styles.textContent}>
                    <Text style={styles.showTextContent}>{arr[index].showText}</Text>
                  </View>
                  {index !== TimeSpans.length - 1 ? <View style={styles.seperation} /> : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    alignItems: 'center',
  },
  arrow: {
    marginTop: 60,
    color: 'white',
    padding: 0,
    margin: -15,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 5,
  },
  textContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  showTextContent: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26,
  },
  seperation: {
    height: 0.3,
    backgroundColor: 'darkgray',
  },
});
