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
import { RED } from '../constants/colors';
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
    focusedElem: 'amountInput',
  };

  componentDidMount() {
    this.props.navigation.state.params.payee
      ? this.amountInput.focus()
      : this.payeeInput.focus();
  }

  //Decide what the next button do
  nextStep = () => {
    if (!this.state.amount) {
      if (this.state.focusedElem !== 'amountInput') {
        this.setState({ focusedElem: 'amountInput' });
      } else {
        this.amountInput.focus();
      }
      return this.amountInput.focus();
    } else if (!this.state.message) {
      if (this.state.focusedElem !== 'messageInput') {
        this.setState({ focusedElem: 'messageInput' });
      } else {
        this.messageInput.focus();
      }
      return this.messageInput.focus();
    } else if (!this.state.payee) {
      return this.props.navigation.navigate('BillSelect');
    }

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
            accessibilityLabel={'Paying Bills to: ' + this.state.payee}
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
            accessibilityLabel={'Enter Amount: ' + this.state.amount}
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
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={InputGroupStyles.inputgroup}
            accessible={true}
            accessibilityLabel={'Bill reference number: ' + this.state.message}
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
            />
          </TouchableOpacity>
        </View>
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
        style={HeaderStyles.headerIcon}
        name="close"
        size={26}
        color={RED}
      />
    </TouchableOpacity>
    <View
      style={HeaderStyles.textWrapper}
      accessible={true}
      accessibilityLabel="Pay bill by filling in the fields and review transaction summary with the button at the bottom of the screen"
    >
      <Text style={HeaderStyles.headerText}>Bills Payment</Text>
    </View>
    <View style={{ width: 18 }} />
  </CommonHeader>
);

const styles = StyleSheet.create({
  inputWrapperTop: {
    flexDirection: 'column',
    width: '100%',
  },
});
