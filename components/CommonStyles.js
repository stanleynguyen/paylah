import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { RED, WHITE } from '../constants/colors';

export const HeaderStyles = StyleSheet.create({
  header: {
    flex: 0.09,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.8,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  headerText: {
    fontSize: 18,
  },
  textWrapper: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImg: {
    height: '60%',
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
  btnContainer: {
    flexDirection: 'row',
  },
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

export const ContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const ConfirmationPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  shadowWrapper: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 4,
  },
  detailsContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  field: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldIcon: {
    marginRight: 10,
  },
  edit: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});
