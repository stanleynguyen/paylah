import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';

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

const App = SwitchNavigator({
  Home: { screen: Home },
  Bill: { screen: Bill },
  BillConfirmation: { screen: BillConfirmation },
  BillDone: { screen: BillDone },
  Pay: { screen: Pay },
  PayConfirmation: { screen: PayConfirmation },
  PayDone: { screen: PayDone },
  Request: { screen: Request },
});

export default App;
