import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  HeaderStyles,
  InputGroupStyles,
  ButtonStyles,
} from '../components/CommonStyles';
import { SimpleLineIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { GREY } from '../constants/colors';

export default class Bill extends React.Component {
  state = {
    amount: '',
    message: '',
    btnDisabled: true,
  };

  onInputChage = (text, field) => {
    const btnDisabled = !(
      (this.state.amount !== '' && field === 'message' && text !== '') ||
      (this.state.message !== '' && field === 'amount' && text !== '')
    );
    this.setState({ [field]: text, btnDisabled });
  };
  messageFocus = input => {
    this.messageInput.focus();
  };
  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'column', width: '100%' }}>
          <View
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel="Choose Payee"
          >
            <SimpleLineIcons
              name="user"
              style={InputGroupStyles.inputicon}
              size={35}
            />
            <TextInput
              placeholder="Pay To (max 5)"
              style={InputGroupStyles.input}
              underlineColorAndroid={'transparent'}
            />
          </View>
          <View
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel="Amount"
          >
            <MaterialIcons
              name="attach-money"
              style={InputGroupStyles.inputicon}
              size={35}
            />
            <TextInput
              placeholder="Amount"
              style={InputGroupStyles.input}
              underlineColorAndroid={'transparent'}
              keyboardType="numeric"
              value={this.state.amount}
              onChangeText={t => this.onInputChage(t, 'amount')}
              ref={i => (this.amountInput = i)}
              onSubmitEditing={this.messageFocus}
            />
          </View>
          <View
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel="Type A Message"
          >
            <Feather
              name="message-square"
              style={InputGroupStyles.inputicon}
              size={35}
            />
            <TextInput
              placeholder="Message"
              style={InputGroupStyles.input}
              underlineColorAndroid={'transparent'}
              value={this.state.message}
              onChangeText={t => this.onInputChage(t, 'message')}
              ref={i => (this.messageInput = i)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[
            ButtonStyles.reviewbtn,
            this.state.btnDisabled ? { backgroundColor: GREY } : {},
          ]}
          disabled={this.state.btnDisabled}
          accessible={true}
          accessibilityLabel="Review"
          onPress={() => {
            console.log('press review');
          }}
        >
          <Text style={ButtonStyles.text}>REVIEW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// export to class for it to work with HMR
export class Header extends React.Component {
  render() {
    return (
      <View
        style={HeaderStyles.header}
        accessible={true}
        accessibilityLabel="Pay friends by filling in the fields and review transation summary with the button at the bottom of the screen"
      >
        <Text style={HeaderStyles.headerText}>Pay To Friends</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
