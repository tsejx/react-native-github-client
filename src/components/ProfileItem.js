import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function ProfileItem({ text, IconCom, iconType, color, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <View style={styles.menuDes}>
        {IconCom && iconType ? (
          <IconCom name={iconType} size={16} style={[styles.menuIcon, { color: color }]} />
        ) : (
          <View style={styles.menuText} />
        )}
        <Text>{text}</Text>
      </View>
      <AntDesign name="right" size={16} style={styles.menuIndicator} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 60,
    backgroundColor: 'white',
  },
  menuDes: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    opacity: 1,
    width: 16,
    height: 16,
    marginRight: 10,
  },
  menuIndicator: {
    marginRight: 10,
    alignSelf: 'center',
    color: '#0557FF',
  },
});
