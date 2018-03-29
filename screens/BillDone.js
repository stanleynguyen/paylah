import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class BillDone extends React.Component {
  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Page: {state.params.pagename}</Text>
        <Button title="Back Home" onPress={() => navigate('Home')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
