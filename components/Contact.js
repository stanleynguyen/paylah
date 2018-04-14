import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { GREY, WHITE } from '../constants/colors';
import Feather from '@expo/vector-icons/Feather';

export const Contactlist = ({ title, contacts, onPayeeChosen }) => (
  <View accessible={false} style={styles.contactList}>
    <View
      style={{ width: '100%' }}
      accessible={true}
      accessibilityLabel={title}
    >
      <Text style={styles.listTitle}>{title.toUpperCase()}</Text>
    </View>
    {contacts.map(c => (
      <Contact key={c.number} {...c} onPress={() => onPayeeChosen(c)} />
    ))}
  </View>
);

export const Contact = ({ name, number, onPress, selected }) => (
  <TouchableOpacity
    style={styles.container}
    accessible={true}
    accessibilityLabel={`${name} ${number.split('').join(' ')}, ${
      selected ? 'selected' : 'double tap to choose'
    }`}
    accessibilityComponentType="button"
    onPress={selected ? () => {} : onPress}
  >
    <View style={styles.avatar} accessible={false}>
      <Text style={styles.avaText}>{name[0].toUpperCase()}</Text>
    </View>
    <View style={styles.details} accessible={false}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{number}</Text>
    </View>
    {selected && (
      <View style={styles.tick} accessible={false}>
        <Feather name="check" size={30} />
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    height: 60,
    width: '100%',
  },
  avatar: {
    height: 40,
    width: 40,
    backgroundColor: GREY,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avaText: {
    fontSize: 25,
    color: WHITE,
  },
  details: {
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  contactList: {
    padding: 10,
    width: '100%',
  },
  listTitle: {
    color: GREY,
  },
  tick: {
    marginLeft: 'auto',
    // marginRight: 5,
  },
});
