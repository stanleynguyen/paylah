import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  findNodeHandle,
  AccessibilityInfo,
} from 'react-native';
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
          <View style={styles.detailsContainer} accessible={false}>
            <TouchableOpacity
              accessible={true}
              style={styles.edit}
              accessibilityLabel="Edit current transaction"
              accessibilityComponentType="button"
              onPress={() => this.props.navigation.goBack(null)}
            >
              <Feather name="edit" size={35} color={RED} />
            </TouchableOpacity>
            <View
              style={styles.field}
              accessible={true}
              accessibilityLabel={`Paying to ${state.params.payee.name}`}
            >
              <FontAwesome
                name="building-o"
                style={styles.fieldIcon}
                size={32}
              />
              <Text style={styles.fieldTxt}>{state.params.payee.name}</Text>
            </View>
            <View
              style={styles.field}
              accessible={true}
              accessibilityLabel={`Amount: ${state.params.amount}`}
            >
              <MaterialIcons
                name="attach-money"
                style={styles.fieldIcon}
                size={32}
              />
              <Text style={styles.fieldTxt}>{state.params.amount}</Text>
            </View>
            <View
              style={styles.field}
              accessible={true}
              accessibilityLabel={`Bill reference number: ${state.params.message
                .split('')
                .join(' ')}`}
            >
              <MaterialIcons
                name="receipt"
                style={styles.fieldIcon}
                size={32}
              />
              <Text style={styles.fieldTxt}>{state.params.message}</Text>
            </View>
          </View>
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

export class Header extends React.Component {
  componentDidMount() {
    const tag = findNodeHandle(this.HeaderElem);
    setTimeout(() => AccessibilityInfo.setAccessibilityFocus(tag), 100);
  }
  render() {
    return (
      <CommonHeader>
        <View
          accessible={true}
          ref={i => (this.HeaderElem = i)}
          accessibilityLabel="Review transaction details and confirm transaction at the bottom of the page"
          style={{ width: '100%', alignItems: 'center' }}
        >
          <Text style={HeaderStyles.headerText}>Confirm Transaction</Text>
        </View>
      </CommonHeader>
    );
  }
}
