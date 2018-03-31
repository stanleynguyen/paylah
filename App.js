import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import {
  Home,
  Bill,
  BillConfirmation,
  BillDone,
  Pay,
  PayConfirmation,
  PayDone,
  Request,
} from './screens';
import { Header as BillHeader } from './screens/Bill';

const App = StackNavigator({
  Home: { screen: Home },
  Bill: {
    screen: Bill,
    navigationOptions: {
      header: <BillHeader />,
    },
  },
  BillConfirmation: { screen: BillConfirmation },
  BillDone: { screen: BillDone },
  Pay: { screen: Pay },
  PayConfirmation: { screen: PayConfirmation },
  PayDone: { screen: PayDone },
  Request: { screen: Request },
});

export default App;
