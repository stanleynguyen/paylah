import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  InputAccessoryView,
  Button,
  KeyboardAvoidingView,
  findNodeHandle,
  AccessibilityInfo,
} from 'react-native';
import { Foundation, FontAwesome } from '@expo/vector-icons';
import CommonHeader from '../components/Header';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {
  HeaderStyles,
  InputGroupStyles,
  ContainerStyles,
  ButtonStyles,
} from '../components/CommonStyles';
import { RED, GREY } from '../constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default class Bill extends React.Component {
  static navigationOptions = { title: 'Home' };

  state = {
    amount: '',
    message: '',
    payee: this.props.navigation.state.params.payee
      ? this.props.navigation.state.params.payee
      : this.props.navigation.navigate('Home', { pagename: 'Home' }),
    buttonName: 'Next',
    btnDisabled: true,
    focusedElem: '',
  };

  componentDidMount() {
    this.props.navigation.state.params.payee
      ? this.amountInput.focus()
      : this.payeeInput.focus();
  }

  componentDidUpdate() {
    if (
      this.state.amount &&
      this.state.payee &&
      this.state.message &&
      this.state.btnDisabled
    ) {
      this.setState({ btnDisabled: false });
    } else if (
      (!this.state.amount || !this.state.payee || !this.state.message) &&
      !this.state.btnDisabled
    ) {
      this.setState({ btnDisabled: true });
    }
  }

  onElemFocus = e => {
    this.setState({ focusedElem: e });
  };

  //Decide what the next button do
  nextStep = () => {
    if (this.state.btnDisabled) return;

    return this.props.navigation.navigate('BillConfirmation', {
      pagename: 'Confirmation',
      payee: this.state.payee,
      amount: this.state.amount,
      message: this.state.message,
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ContainerStyles.container}>
        <View style={styles.inputWrapperTop}>
          <TouchableOpacity
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel={'Paying bills to: ' + this.state.payee.name}
            onPress={() => this.props.navigation.navigate('BillSelect')}
          >
            <FontAwesome
              name="building-o"
              style={InputGroupStyles.inputicon}
              size={35}
              // color="darkgrey"
            />
            <Text style={[InputGroupStyles.input, { paddingLeft: 5 }]}>
              {this.state.payee.name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel={`Amount: ${this.state.amount &&
              this.state.amount + 'Singapore Dollar'}, text edit${
              this.state.focusedElem === 'amount' ? ', editing' : ''
            }`}
            onPress={() => this.amountInput.focus()}
          >
            <MaterialIcons
              name="attach-money"
              style={InputGroupStyles.inputicon}
              size={35}
              // color="darkgrey"
            />
            <TextInput
              placeholder="Enter Amount"
              style={InputGroupStyles.input}
              keyboardType="numeric"
              value={this.state.amount}
              onChangeText={amount => this.setState({ amount })}
              ref={i => (this.amountInput = i)}
              underlineColorAndroid={'transparent'}
              onSubmitEditing={this.nextStep}
              onFocus={this.onElemFocus.bind(this, 'amount')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel={`Bill reference number: ${this.state.message
              .split('')
              .join(' ')}, text edit, ${
              this.state.focusedElem === 'message' ? 'editing' : ''
            }`}
            onPress={() => this.messageInput.focus()}
          >
            <MaterialIcons
              name="receipt"
              style={InputGroupStyles.inputicon}
              size={35}
              // color="darkgrey"
            />
            <TextInput
              placeholder="Enter Bill Reference Number"
              accessible={true}
              accessibilityLabel={`Enter bill reference number ${
                this.state.message
              }`}
              style={InputGroupStyles.input}
              value={this.state.message}
              onChangeText={message => this.setState({ message })}
              ref={i => (this.messageInput = i)}
              underlineColorAndroid={'transparent'}
              onSubmitEditing={this.nextStep}
              onFocus={this.onElemFocus.bind(this, 'message')}
            />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={75}
          style={ButtonStyles.btnContainer}
        >
          <TouchableOpacity
            style={[
              ButtonStyles.reviewbtn,
              {
                backgroundColor: this.state.btnDisabled ? GREY : RED,
              },
            ]}
            accessible={true}
            accessibilityLabel={
              !this.state.payee
                ? 'Disabled next button, please choose an organisation'
                : !this.state.amount
                  ? 'Disabled next button, please enter an amount'
                  : !this.state.message
                    ? 'Disabled next button, please enter a bill reference number'
                    : 'Next'
            }
            accessibilityComponentType={
              this.state.btnDisabled ? 'none' : 'button'
            }
            onPress={this.nextStep}
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
          accessibilityLabel="Close"
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
          accessible={true}
          ref={i => (this.HeaderElem = i)}
          accessibilityLabel="Pay bill by filling in the fields and review transaction summary with the button at the bottom of the screen"
        >
          <Text style={HeaderStyles.headerText}>Bills Payment</Text>
        </View>
        <View style={{ width: 18 }} />
      </CommonHeader>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapperTop: {
    flexDirection: 'column',
    width: '100%',
  },
});
