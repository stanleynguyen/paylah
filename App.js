import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Pay, { Header as PayHeader } from './screens/Pay';
import Home from './screens/Home';
import Bill from './screens/Bill';
import BillSelect from './screens/BillSelect';
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
  BillSelect: { screen: BillSelect },
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
  PayDone: {
    screen: PayDone,
    navigationOptions: {
      header: null,
    },
  },
  Request: { screen: Request },
  SelectNumbers: {
    screen: SelectNumbers,
    navigationOptions: {
      header: null,
    },
  },
});
const defaultGetStateForAction = App.router.getStateForAction;
App.router.getStateForAction = (action, state) => {
  if (state && action.type === 'GoToRoute') {
    let index = state.routes.findIndex(item => {
      return item.routeName === action.routeName;
    });
    const routes = state.routes.slice(0, index + 1);
    return {
      routes,
      index,
    };
  }
  return defaultGetStateForAction(action, state);
};

export default App;
