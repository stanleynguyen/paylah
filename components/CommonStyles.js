import React from 'react';
import { StyleSheet } from 'react-native';
import { RED, WHITE } from '../constants/colors';

export const HeaderStyles = StyleSheet.create({
  header: {
    marginTop: 20,
    flex: 0.09,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
  },
});

export const InputGroupStyles = StyleSheet.create({
  inputgroup: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    marginBottom: 10,
  },
  inputgroupicon: {
    flex: 0.05,
  },
  input: {
    fontSize: 18,
    flex: 0.95,
  },
});

export const ButtonStyles = StyleSheet.create({
  reviewbtn: {
    width: '100%',
    borderRadius: 4,
    height: 45,
    backgroundColor: RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
