import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { GREY, WHITE } from '../constants/colors';

export const Company = ({ item, onPress }) => (
  <TouchableOpacity
    accessible={true}
    accessibilityComponentType="button"
    accessibilityLabel={`Double tap to choose organisation ${
      item.company.name
    }`}
    onPress={onPress}
    style={styles.company}
  >
    <View accessible={false} style={styles.avatar}>
      <Text style={styles.avaTxt}>{item.company.name[0].toUpperCase()}</Text>
    </View>
    <View style={styles.details}>
      <Text>{item.company.name}</Text>
      <Text style={styles.companyType}>{item.company.type}</Text>
    </View>
  </TouchableOpacity>
);

export const ListByCategory = ({ title, companies, onCompanyPress }) => (
  <View accessible={false} style={styles.container}>
    <View
      style={{ width: '100%' }}
      accessible={true}
      accessibilityLabel={title}
    >
      <Text style={styles.listTitle}>{title.toUpperCase()}</Text>
    </View>
    {companies.map(c => (
      <Company key={c.id} item={c} onPress={onCompanyPress} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    // height: 60,
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
  avaTxt: {
    color: WHITE,
    fontSize: 25,
  },
  details: {
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  company: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
  },
  companyType: {
    color: 'rgba(0,0,0,0.5)',
  },
  listTitle: {
    color: GREY,
  },
});
