import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import CommonHeader from '../components/Header';
import { RED } from '../constants/colors';
import {
  ConfirmationPageStyles,
  ButtonStyles,
  HeaderStyles,
} from '../components/CommonStyles';

export default class BillConfirmation extends React.Component {
  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View style={styles.container} accessible={false}>
        <View style={styles.shadowWrapper} accessible={false}>
          <TouchableOpacity
            style={styles.detailsContainer}
            accessible={true}
            accessibilityLabel={`Pay ${state.params.amount} to ${
              state.params.payee.name
            } for bill reference ${state.params.message}. Double tap to edit`}
            onPress={() => this.props.navigation.goBack()}
          >
            <Feather name="edit" style={styles.edit} size={35} color={RED} />
            <View style={styles.field} accessible={false}>
              <FontAwesome
                name="building-o"
                style={styles.fieldIcon}
                size={32}
              />
              <Text style={styles.fieldTxt}>{state.params.payee.name}</Text>
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
              <MaterialIcons
                name="receipt"
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

const styles = ConfirmationPageStyles;

export const Header = () => (
  <CommonHeader>
    <View
      accessible={true}
      accessibilityLabel="Review transaction details and confirm transaction at the bottom of the page"
      style={{ width: '100%', alignItems: 'center' }}
    >
      <Text style={HeaderStyles.headerText}>Confirm Transaction</Text>
    </View>
  </CommonHeader>
);
