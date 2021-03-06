import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Pay, { Header as PayHeader } from './screens/Pay';
import Home, { Header as HomeHeader } from './screens/Home';
import Bill, { Header as BillHeader } from './screens/Bill';
import BillSelect from './screens/BillSelect';
import BillConfirmation, {
  Header as BillCfmHeader,
} from './screens/BillConfirmation';
import PayConfirmation, {
  Header as PayCfmHeader,
} from './screens/PayConfirmation';
import PayDone from './screens/PayDone';
import Request, { Header as RequestHeader } from './screens/Request';
import SelectNumbers, { Header as PayeeHeader } from './screens/SelectNumbers';
import RequestConfirmation, {
  Header as RequestCfmHeader,
} from './screens/RequestConfirmation';
import AddFav, { Header as AddFavHeader } from './screens/AddFav';

const App = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: <HomeHeader />,
    },
  },
  Bill: {
    screen: Bill,
    navigationOptions: {
      header: ({ navigation }) => <BillHeader navigation={navigation} />,
    },
  },
  BillSelect: {
    screen: BillSelect,
    navigationOptions: {
      header: null,
    },
  },
  BillConfirmation: {
    screen: BillConfirmation,
    navigationOptions: {
      header: <BillCfmHeader />,
    },
  },
  Pay: {
    screen: Pay,
    navigationOptions: {
      header: ({ navigation }) => <PayHeader navigation={navigation} />,
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
  Request: {
    screen: Request,
    navigationOptions: {
      header: ({ navigation }) => <RequestHeader navigation={navigation} />,
    },
  },
  SelectNumbers: {
    screen: SelectNumbers,
    navigationOptions: {
      header: null,
    },
  },
  RequestConfirmation: {
    screen: RequestConfirmation,
    navigationOptions: {
      header: <RequestCfmHeader />,
    },
  },
  AddFav: {
    screen: AddFav,
    navigationOptions: {
      header: ({ navigation }) => <AddFavHeader navigation={navigation} />,
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
