import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  findNodeHandle,
  AccessibilityInfo,
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
  Ionicons,
  EvilIcons,
} from '@expo/vector-icons';
import { GREY, WHITE, RED } from '../constants/colors';
import CommonHeader from '../components/Header';
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
      forPage: 'Pay',
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
  onElemFocus = e => {
    this.setState({ focusedElem: e });
  };
  nextStep = () => {
    if (!this.state.amount || this.state.payees.length === 0) return;

    return this.props.navigation.navigate('PayConfirmation', this.state);
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
            accessibilityLabel="Choose payee"
            accessibilityComponentType="button"
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
          <TouchableOpacity
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel={`Amount: ${this.state.amount &&
              this.state.amount + 'Singapore Dollar'}, text edit${
              this.state.focusedElem === 'amount' ? ', editing' : ''
            }`}
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
              onFocus={this.onElemFocus.bind(this, 'amount')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel={`Optional message: ${
              this.state.message
            }, text edit, ${
              this.state.focusedElem === 'message' ? 'editing' : ''
            }`}
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
              onFocus={this.onElemFocus.bind(this, 'message')}
            />
          </TouchableOpacity>
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={75}
          style={ButtonStyles.btnContainer}
        >
          <TouchableOpacity
            style={[
              ButtonStyles.reviewbtn,
              {
                backgroundColor:
                  this.state.payees.length === 0 || !this.state.amount
                    ? GREY
                    : RED,
              },
            ]}
            accessible={true}
            accessibilityLabel={
              this.state.payees.length === 0
                ? 'Disabled next button, please choose one or more payee'
                : this.state.amount
                  ? 'Disabled next button, please enter amount'
                  : 'Next'
            }
            accessibilityComponentType={
              this.state.payees.length === 0 || !this.state.amount
                ? 'none'
                : 'button'
            }
            onPress={this.nextStep}
            disabled={this.state.payees.length === 0 || !this.state.amount}
          >
            <Text style={ButtonStyles.text}>NEXT</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export class Header extends React.Component {
  componentDidMount() {
    const tag = findNodeHandle(this.HeaderElem);
    setTimeout(() => AccessibilityInfo.setAccessibilityFocus(tag), 100);
  }
  render() {
    const { navigation } = this.props;
    return (
      <CommonHeader>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Cancel"
          accessibilityComponentType="button"
          onPress={() => navigation.goBack(null)}
        >
          <EvilIcons
            style={HeaderStyles.headerIcon}
            name="close"
            size={26}
            color={RED}
          />
        </TouchableOpacity>
        <View
          style={HeaderStyles.textWrapper}
          ref={i => (this.HeaderElem = i)}
          accessible={true}
          accessibilityLabel="Pay friends by filling in the fields and review transaction summary with the button at the bottom of the screen"
        >
          <Text style={HeaderStyles.headerText}>Pay To Friends</Text>
        </View>
        <View style={{ width: 18 }} />
      </CommonHeader>
    );
  }
}
