import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { WHITE, GREY, RED } from '../constants/colors';

export const Payee = ({ name, number, onPress }) => (
  <TouchableOpacity
    accessible={true}
    accessibilityLabel={`Double tap to remove ${name}`}
    accessibilityComponentType="button"
    style={styles.payee}
    onPress={onPress}
  >
    <Ionicons
      style={styles.clsBtn}
      name="ios-close-circle"
      size={20}
      color={RED}
    />
    <View accessible={false} style={styles.payeeAva}>
      <Text style={styles.avaTxt}>{name[0].toUpperCase()}</Text>
    </View>
    <Text style={styles.name}>{name.split(' ')[0].substring(0, 9)}</Text>
  </TouchableOpacity>
);

export const PayeeList = ({ payees, onPayeePressed }) => (
  <View
    accessible={true}
    accessibilityLabel="Selected payees list"
    style={styles.container}
  >
    {payees.map(p => (
      <Payee key={p.number} {...p} onPress={() => onPayeePressed(p)} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payee: {
    width: 60,
    alignItems: 'center',
    marginRight: 10,
  },
  payeeAva: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avaTxt: {
    color: WHITE,
    fontSize: 25,
  },
  clsBtn: {
    position: 'absolute',
    top: 0,
    right: 5,
    zIndex: 1,
  },
});
