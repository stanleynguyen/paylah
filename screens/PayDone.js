import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ButtonStyles } from '../components/CommonStyles';

export default class PayDone extends React.Component {
  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View style={styles.container} accessible={false}>
        <View accessible={false} />
        <View
          accessible={true}
          accessibilityLabel="Transaction successful"
          style={styles.sentContainer}
        >
          <Text style={styles.sent}>Sent</Text>
          <View accessible={false} style={styles.iconWrapper}>
            <MaterialIcons name="done" size={100} />
          </View>
        </View>
        <View accessible={false} style={styles.btnContainer}>
          <TouchableOpacity
            style={[ButtonStyles.reviewbtn, { marginBottom: 20 }]}
            accessible={true}
            accessibilityLabel="History"
            accessibilityComponentType="button"
          >
            <Text style={ButtonStyles.text}>HISTORY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ButtonStyles.reviewbtn}
            accessible={true}
            accessibilityLabel="Home"
            accessibilityComponentType="button"
            onPress={() =>
              this.props.navigation.dispatch({
                routeName: 'Home',
                type: 'GoToRoute',
              })
            }
          >
            <Text style={ButtonStyles.text}>HOME</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  sentContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    height: 180,
    width: 180,
    borderWidth: 4,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sent: {
    fontSize: 20,
    marginBottom: 10,
  },
  btnContainer: {
    width: '100%',
  },
});
