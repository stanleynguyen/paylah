import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, InputAccessoryView, Button, KeyboardAvoidingView, } from 'react-native';
import { Foundation, FontAwesome } from '@expo/vector-icons';

export default class Bill extends React.Component {
  static navigationOptions = {title: 'Home'};

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      message: '',
      payee:this.props.navigation.state.params.payee
        ? this.props.navigation.state.params.payee
        : this.props.navigation.navigate('Home', { pagename: 'Home' }),
      buttonName: 'Next',
      btnDisabled: true};
  }

  componentDidMount() {
    this.props.navigation.state.params.payee
      ? this.amountInput.focus()
      : this.payeeInput.focus();
  };

  //Decide what the next button do
  nextStep = () => {
    if(this.state.payee && this.state.amount && this.state.message){
      return this.props.navigation.navigate('BillConfirmation', { pagename: 'Confirmation', payee:this.state.payee, amount:this.state.amount, message:this.state.message});
    }
    if (this.state.payee && this.state.amount){
      return [this.state.message = ' ', this.messageInput.focus()];
    }
    if (this.state.amount === ''){
      return this.amountInput.focus(); //popup must key in amount
    }
    return this.amountInput.focus();   
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapperTop}>

          <TouchableOpacity style={styles.inputField} accessible={true} accessibilityLabel={"Paying Bills to: " + this.state.payee}>
            <View style={styles.iconWrapper}>
              <FontAwesome
                name="building-o"
                style={styles.inputIcon}
                size={35}
                color='darkgrey'/>
            </View>
            <Text style={styles.inputText} ref={i => (this.payeeInput = i)}>
              {this.state.payee}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.inputField} accessible={true} accessibilityLabel={"Enter Amount: " + this.state.amount} onPress={()=>this.amountInput.focus()}>
            <View style={styles.iconWrapper}>
              <FontAwesome
                name="dollar"
                style={styles.inputIcon}
                size={35} 
                color='darkgrey'/>
            </View>
            <TextInput
              placeholder="Enter Amount"
              style={styles.inputText}
              keyboardType="numeric"
              value={this.state.amount}
              onChangeText={(amount) => this.setState({amount})}
              ref={i => (this.amountInput = i)}
              // onSubmitEditing={this.messageFocus}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.inputField} accessible={true} accessibilityLabel={"Type your message: " + this.state.message} onPress={()=>this.messageInput.focus()}>
            <View style={styles.iconWrapper}>
              <FontAwesome
                name="envelope-o"
                style={styles.inputIcon}
                size={35} 
                color='darkgrey'/>
            </View>
            <TextInput
              placeholder="Type your message"
              style={styles.inputText}
              value={this.state.message}
              onChangeText={(message) => this.setState({message})}
              ref={i => (this.messageInput = i)}
              // onSubmitEditing={this.messageFocus}
            />
          </TouchableOpacity>


        </View>
        <KeyboardAvoidingView style={styles.inputWrapperBottom} behavior="padding" keyboardVerticalOffset={65}>
          <TouchableOpacity style={styles.nextButton} accessibilityLabel="Next" onPress={this.nextStep}>
            <Text style={styles.buttonText}> {this.state.buttonName} </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

//   render() {
//     const { navigate, state } = this.props.navigation;
//     const payee = state.params.payee ? state.params.payee : null;

//     return (
//       <View style={styles.container}>
//         <Text>Page: {state.params.pagename}</Text>
//             <TextInput
//               placeholder="Pay Bills To"
//               editable = {!payee}
//               value = {payee}
//             />
//       </View>
//     );
//   }
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    
  },
  inputWrapperTop:{
    flex:4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  inputField: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconWrapper:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    //why cant I use justify content this is so so weird
    paddingTop: 10,
  },
  inputIcon:{
    flex:1
  },
  inputText:{
    flex:5,
    fontSize: 16,
  },

  inputWrapperBottom:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  nextButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderTopColor: 'lightgrey',
    borderTopWidth: StyleSheet.hairlineWidth,
    // borderRadius: 15,
    height: 50,
  },
  buttonText:{
    color: '#FA5A74',
    fontWeight: '400',
    fontSize: 20,
  }

});



// import React, { Component } from 'react';
// import { AppRegistry, Text, View } from 'react-native';

// class Blink extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {isShowingText: true};

//     // Toggle the state every second
//     setInterval(() => {
//       this.setState(previousState => {
//         return { isShowingText: !previousState.isShowingText };
//       });
//     }, 1000);
//   }

//   render() {
//     let display = this.state.isShowingText ? this.props.text : ' ';
//     return (
//       <Text>{display}</Text>
//     );
//   }
// }

// export default class BlinkApp extends Component {
//   render() {
//     return (
//       <View>
//         <Blink text='I love to blink' />
//       </View>
//     );
//   }
// }

// // skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => BlinkApp);