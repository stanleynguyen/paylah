import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Pay, { Header as PayHeader } from './screens/Pay';
import Home from './screens/Home';
import Bill from './screens/Bill';
import BillConfirmation from './screens/BillConfirmation';
import BillDone from './screens/BillDone';
import PayConfirmation, {
  Header as PayCfmHeader,
} from './screens/PayConfirmation';
import PayDone from './screens/PayDone';
import Request from './screens/Request';
import SelectNumbers, { Header as PayeeHeader } from './screens/SelectNumbers';

const App = StackNavigator({
  Home: { screen: Home },
  Bill: { screen: Bill },
  BillConfirmation: { screen: BillConfirmation },
  BillDone: { screen: BillDone },
  Pay: {
    screen: Pay,
    navigationOptions: {
      header: <PayHeader />,
    },
  },
  PayConfirmation: {
    screen: PayConfirmation,
    navigationOptions: {
      header: <PayCfmHeader />,
    },
  },
  PayDone: { screen: PayDone },
  Request: { screen: Request },
  SelectNumbers: {
    screen: SelectNumbers,
    navigationOptions: {
      header: null,
    },
  },
});

export default App;
