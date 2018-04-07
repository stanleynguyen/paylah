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
    <Text style={styles.name}>{name.split(' ')[0].substring(0, 8)}</Text>
  </TouchableOpacity>
);

export const PayeeOnPayPage = ({
  name,
  number,
  onPress,
  accessible = true,
  showRemove = true,
  requestPage = false,
}) => (
  <View
    accessible={accessible}
    accessibilityLabel={`${name} ${number}`}
    style={styles.payeeOnPay}
  >
    <View accessible={false} style={styles.avatar}>
      <Text style={styles.avaTxt}>{name[0].toUpperCase()}</Text>
    </View>
    <Text style={styles.name}>{name}</Text>
    {showRemove ? (
      <TouchableOpacity
        accessible={accessible}
        accessibilityLabel={`Double tap to remove ${name} from ${
          requestPage ? 'requested contacts' : 'payees'
        } list`}
        accessibilityComponentType="button"
        onPress={onPress}
        style={{ justifyContent: 'center' }}
      >
        <Ionicons name="ios-close-circle" color={RED} size={30} />
      </TouchableOpacity>
    ) : (
      <View accessible={false} />
    )}
  </View>
);

export const PayeeList = ({ payees, onPayeePressed }) => (
  <View accessible={false} style={styles.container}>
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
  avatar: {
    height: 30,
    width: 30,
    backgroundColor: GREY,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avaTxt: {
    color: WHITE,
  },
  payeeOnPay: {
    flexDirection: 'row',
    marginTop: -5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: GREY,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
