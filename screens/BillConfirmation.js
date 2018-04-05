import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default class BillConfirmation extends React.Component {
  // state = {
  //   amount: this.props.navigation.state.params.amount,
  //   message: this.props.navigation.state.params.message,
  //   payee: this.props.navigation.state.params.payee,
  // };

  // / {this.state.payee + this.state.amount + this.state.message}
  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.confirmationTextBox}>
            <Text style={styles.textLabel}>
              Paying to
            </Text>
            <Text style={styles.textValue}>
              Singtel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmationTextBox}>
            <Text style={styles.textLabel}>
              Bill Reference Number
            </Text>
            <Text style={styles.textValue}>
              FJ112950J10J
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmationTextBox}>
            <Text style={styles.textLabel}>
              Paid Amount
            </Text>
            <Text style={styles.textValue}>
              $193.10
            </Text>          
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmationTextBox}>
            <Text style={styles.textLabel}>
              Paid Using
            </Text>
            <Text style={styles.textValue}>
              PayLah Credit
            </Text>          
          </TouchableOpacity>
        </View>
        <View style={styles.containerBottom}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Send
            </Text>  
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  containerTop: {
    flex: 4,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  containerBottom: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 15
  },  
  confirmationTextBox:{
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel:{
    flex:3,
    fontSize: 16,
    color: 'grey',
    textAlign: 'left',
    paddingLeft: 20,
    fontWeight: '300'
  },
  textValue:{
    flex:2,
    fontSize: 20,
    textAlign: 'right',
    paddingRight: 15,
    fontWeight: '300'
  },
  // buttonWrapper:{
  //   height: 80,
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',    
  // },
  button:{
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FA5A74',
    borderRadius: 15,
  },
  buttonText:{
    fontSize: 20,
    color: 'white',
  },

});


        // <Text style={styles.confirmationText}>
        //     {'Paying phone bills to: ' + this.state.payee}
        // </Text>
        // <Text style={styles.container}>
        //     {'Bill reference number: S46031JF' + this.state.message}        
        // </Text>
        // <Text style={styles.container}>
        //     {'Amount' + this.state.amount} 
        // </Text>