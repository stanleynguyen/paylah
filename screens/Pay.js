import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  HeaderStyles,
  InputGroupStyles,
  ButtonStyles,
  ContainerStyles,
} from '../components/CommonStyles';
import { SimpleLineIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { GREY, WHITE, RED } from '../constants/colors';
import CommonHeader from '../components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PayeeOnPayPage as Payee } from '../components/Payee';

export default class Pay extends React.Component {
  state = {
    amount: '',
    message: '',
    payees:
      this.props.navigation.state.params &&
      this.props.navigation.state.params.payees
        ? this.props.navigation.state.params.payees
        : [],
    btnDisabled: true,
  };

  componentDidMount() {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.payees
    ) {
      this.amountFocus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.amount === prevState.amount &&
      this.state.payees.length === prevState.payees.length &&
      this.state.message === prevState.message
    ) {
      return;
    }
    const btnDisabled =
      this.state.amount === '' ||
      this.state.message === '' ||
      this.state.payees.length === 0;
    this.setState({ btnDisabled });
  }

  onInputChage = (text, field) => {
    this.setState({ [field]: text });
  };
  onPayeeFocus = () => {
    // Keyboard.dismiss();
    this.props.navigation.navigate('SelectNumbers', {
      enterPayees: this.enterPayees,
      payees: this.state.payees,
    });
  };
  enterPayees = payees => {
    this.setState({ payees });
    this.amountFocus();
  };
  removePayee = pIdx => {
    this.setState({
      payees: [
        ...this.state.payees.slice(0, pIdx),
        ...this.state.payees.slice(pIdx + 1),
      ],
    });
  };
  payeeFocus = () => {
    this.payeeInput.focus();
  };
  amountFocus = () => {
    this.amountInput.focus();
  };
  messageFocus = () => {
    this.messageInput.focus();
  };
  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View style={ContainerStyles.container}>
        <View style={{ flexDirection: 'column', width: '100%' }}>
          <TouchableOpacity
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel="Choose payee"
            onPress={this.onPayeeFocus}
          >
            <SimpleLineIcons
              name="user"
              style={InputGroupStyles.inputicon}
              size={35}
            />
            <Text
              // placeholder=""
              style={[InputGroupStyles.input, { color: GREY }]}
              // underlineColorAndroid={'transparent'}
              // ref={i => (this.payeeInput = i)}
              // onFocus={this.onPayeeFocus}
            >
              Pay To (max 5)
            </Text>
          </TouchableOpacity>
          <View style={{ flexGrow: 0 }}>
            {this.state.payees.map((p, i) => (
              <Payee
                key={p.number}
                {...p}
                accessible={true}
                onPress={() => this.removePayee(i)}
              />
            ))}
          </View>
          <View
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel="Amount"
            onPress={this.amountFocus}
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
            accessibilityLabel="Type a message"
            onPress={this.messageFocus}
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
              accessible={false}
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
          accessibilityLabel={`${
            this.state.btnDisabled ? 'Disabled' : ''
          } review`}
          accessibilityComponentType="button"
          onPress={
            this.state.btnDisabled
              ? () => {}
              : () =>
                  this.props.navigation.navigate('PayConfirmation', this.state)
          }
        >
          <Text style={ButtonStyles.text}>REVIEW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export const Header = () => (
  <CommonHeader accessibilityLabel="Pay friends by filling in the fields and review transation summary with the button at the bottom of the screen">
    <Text style={HeaderStyles.headerText}>Pay To Friends</Text>
  </CommonHeader>
);
