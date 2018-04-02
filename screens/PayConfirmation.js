import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import CommonHeader from '../components/Header';
import { HeaderStyles, ButtonStyles } from '../components/CommonStyles';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { RED } from '../constants/colors';
import { PayeeOnPayPage as Payee } from '../components/Payee';

export default class PayConfirmation extends React.Component {
  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View style={styles.container} accessible={false}>
        <View accessible={false} style={styles.shadowWrapper}>
          <TouchableOpacity
            style={styles.detailsContainer}
            accessible={true}
            accessibilityLabel={`Pay ${
              state.params.amount
            } to ${state.params.payees
              .map(p => `${p.name}, `)
              .join('')} with message ${
              state.params.message
            }. Double tap to edit`}
            accessibilityComponentType="button"
            onPress={() => this.props.navigation.goBack()}
          >
            <Feather name="edit" style={styles.edit} size={35} color={RED} />
            <View style={styles.field} accessible={false}>
              <SimpleLineIcons name="user" style={styles.fieldIcon} size={32} />
              <Text style={styles.fieldTxt}>Recipients</Text>
            </View>
            <View style={{ flexGrow: 0 }} accessible={false}>
              {state.params.payees.map(p => (
                <Payee
                  key={p.number}
                  {...p}
                  accessible={false}
                  showRemove={false}
                  onPress={() => {}}
                />
              ))}
            </View>
            <View style={styles.field} accessible={false}>
              <MaterialIcons
                name="attach-money"
                style={styles.fieldIcon}
                size={32}
              />
              <Text style={styles.fieldTxt}>{state.params.amount}</Text>
            </View>
            <View style={styles.field} accessible={false}>
              <Feather
                name="message-square"
                style={styles.fieldIcon}
                size={32}
              />
              <Text style={styles.fieldTxt}>{state.params.message}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={ButtonStyles.reviewbtn}
          accessible={true}
          accessibilityLabel="Confirm"
          accessibilityComponentType="button"
          onPress={() => navigate('PayDone')}
        >
          <Text style={ButtonStyles.text}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export const Header = () => (
  <CommonHeader accessibilityLabel="Review transaction details and confirm transaction at the bottom of the page">
    <Text style={HeaderStyles.headerText}>Confirm Transaction</Text>
  </CommonHeader>
);

const styles = StyleSheet.create({
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
