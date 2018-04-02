import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
        <Button
          title="To Bill Page"
          onPress={() => navigate('Bill', { pagename: 'Bill Page' })}
        />
        <Button
          title="To Bill Confirmation Page"
          onPress={() =>
            navigate('BillConfirmation', { pagename: 'Bill Confirmation Page' })
          }
        />
        <Button
          title="To Bill Done Page"
          onPress={() => navigate('BillDone', { pagename: 'Bill Done Page' })}
        />
        <Button title="To Pay Page" onPress={() => navigate('SelectNumbers')} />
        <Button
          title="To Request Page"
          onPress={() => navigate('Request', { pagename: 'Request Page' })}
        />
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
