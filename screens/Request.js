import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  HeaderStyles,
  InputGroupStyles,
  ButtonStyles,
  ContainerStyles,
} from '../components/CommonStyles';
import {
  SimpleLineIcons,
  MaterialIcons,
  Feather,
  EvilIcons,
} from '@expo/vector-icons';
import { GREY, WHITE, RED } from '../constants/colors';
import CommonHeader from '../components/Header';
import { PayeeOnPayPage as Payee } from '../components/Payee';

export default class Request extends React.Component {
  state = {
    amount: '',
    message: '',
    payees:
      this.props.navigation.state.params &&
      this.props.navigation.state.params.payees
        ? this.props.navigation.state.params.payees
        : [],
    focusedElem: '',
  };

  componentDidMount() {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.payees
    ) {
      this.amountFocus();
    }
  }

  onInputChage = (text, field) => {
    this.setState({ [field]: text });
  };
  onPayeeFocus = () => {
    // Keyboard.dismiss();
    this.props.navigation.navigate('SelectNumbers', {
      enterPayees: this.enterPayees,
      payees: this.state.payees,
      forPage: 'Request',
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
  nextStep = () => {
    if (!this.state.amount) {
      if (this.state.focusedElem !== 'amountInput') {
        this.setState({ focusedElem: 'amountInput' });
      } else {
        this.amountFocus();
      }
      return this.amountFocus();
    } else if (!this.state.message) {
      if (this.state.focusedElem !== 'messageInput') {
        this.setState({ focusedElem: 'messageInput' });
      } else {
        this.messageFocus();
      }
      return this.messageFocus();
    } else if (this.state.payees.length <= 0) {
      return this.props.navigation.navigate('SelectNumbers', {
        forPage: 'Request',
      });
    }

    return this.props.navigation.navigate('RequestConfirmation', this.state);
  };

  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View style={ContainerStyles.container}>
        <ScrollView
          style={{ flexDirection: 'column', width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel="Choose contact to request from"
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
              Request From (max 5)
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
          <TouchableOpacity
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
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={75}
          style={ButtonStyles.btnContainer}
        >
          <TouchableOpacity
            style={ButtonStyles.reviewbtn}
            accessible={true}
            accessibilityLabel="Next"
            accessibilityComponentType="button"
            onPress={this.nextStep}
          >
            <Text style={ButtonStyles.text}>NEXT</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export const Header = ({ navigation }) => (
  <CommonHeader>
    <TouchableOpacity
      accessible={true}
      accessibilityLabel="Close"
      accessibilityComponentType="button"
      onPress={() => navigation.goBack(null)}
    >
      <EvilIcons
        name="close"
        style={HeaderStyles.headerIcon}
        size={26}
        color={RED}
      />
    </TouchableOpacity>
    <View
      style={HeaderStyles.textWrapper}
      accessible={true}
      accessibilityLabel="Request payment from friends by filling in the fields and review transaction summary with the button at the bottom of the screen"
    >
      <Text style={HeaderStyles.headerText}>Request From Friends</Text>
    </View>
    <View style={{ width: 18 }} />
  </CommonHeader>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
