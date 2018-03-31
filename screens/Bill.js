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
import { RED } from '../constants/colors';

export default class Bill extends React.Component {
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
            />
          </View>
        </View>
        <TouchableOpacity
          style={ButtonStyles.reviewbtn}
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
