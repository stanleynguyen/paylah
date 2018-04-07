import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Font } from 'expo';

import logo from '../icons/logo.jpg';
import CommonHeader from '../components/Header';
import companies from '../data/companies';
import { HeaderStyles } from '../components/CommonStyles';

export default class Home extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View
          style={styles.titleRow}
          accessible={true}
          accessibilityLabel={'Wallet features, heading'}
        >
          <Text style={styles.text}> Wallet Features </Text>
        </View>

        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Pay money, double tap'}
            onPress={() => navigate('SelectNumbers', { forPage: 'Pay' })}
          >
            <FontAwesome name="send" size={40} />
            <Text style={styles.iconLabel}> Pay </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Request money, double tap'}
            onPress={() => navigate('SelectNumbers', { forPage: 'Request' })}
          >
            <MaterialIcons name="message" size={45} />
            <Text style={styles.iconLabel}> Request </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Scan to pay, double tap'}
            onPress={() => navigate('PayConfirmation')}
          >
            <Ionicons name="md-qr-scanner" size={40} />
            <Text style={styles.iconLabel}> Scan </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Pay bills, double tap'}
            onPress={() => navigate('BillSelect', { pagename: 'Select Payee' })}
          >
            <MaterialIcons name="receipt" size={45} />
            <Text style={styles.iconLabel}> Bills </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.balanceRow}>
          <TouchableOpacity
            style={styles.balanceText}
            accessible={true}
            onPress={() => navigate('Pay', { pagename: 'Pay Page' })}
          >
            <Text style={styles.balanceLabel}> Balance : </Text>
            <Text style={styles.balance}> $100.70 </Text>
          </TouchableOpacity>
          <View style={styles.balanceMenu}>
            <TouchableOpacity style={styles.balanceButton}>
              <Text style={{ color: '#FE6D7C' }}> Top-up </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceButton}>
              <Text style={{ color: '#FE6D7C' }}> Withdraw </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={styles.titleRow}
          accessible={true}
          accessibilityLabel={'Favourite, heading'}
        >
          <Text style={styles.text}> Favourites </Text>
        </View>

        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Pay Money to A, double tap'}
            onPress={() =>
              navigate('Bill', { pagename: 'Bill Page', payee: 'Singtel' })
            }
          >
            <Image
              style={styles.icon}
              source={require('../icons/valerie.png')}
            />
            <Text style={styles.iconLabel}> Name </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Pay Money to B, double tap'}
          >
            <Image
              style={styles.icon}
              source={require('../icons/pengfei.png')}
            />
            <Text style={styles.iconLabel}> Name </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Pay Money to C, double tap'}
          >
            <Image style={styles.icon} source={require('../icons/bella.png')} />
            <Text style={styles.iconLabel}> Name </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Pay Money to D, double tap'}
          >
            <Image
              style={styles.icon}
              source={require('../icons/michelle.png')}
            />
            <Text style={styles.iconLabel}> Name </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconRow}>
          {companies.slice(0, 4).map(c => (
            <TouchableOpacity
              key={c.id}
              style={styles.iconButton}
              accessible={true}
              accessibilityLabel={'Pay Money to A, double tap'}
              onPress={() =>
                navigate('Bill', { pagename: 'Bill Page', payee: c.company })
              }
            >
              <Image
                style={styles.icon}
                source={require('../icons/valerie.png')}
              />
              <Text style={styles.iconLabel}>{c.company.name.slice(0, 9)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.menuRow}>
          <TouchableOpacity
            style={styles.menuButton}
            accessible={true}
            accessibilityLabel={'Home Menu, double tap'}
            onPress={() => navigate('Home', { pagename: 'Home' })}
          >
            <MaterialCommunityIcons
              name="home-outline"
              color="#484848"
              size={30}
            />
            <Text style={styles.menuLabel}> Home </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            accessible={true}
            accessibilityLabel={'Payment Records, double tap'}
          >
            <MaterialCommunityIcons
              name="history"
              size={30}
              color="lightgrey"
            />
            <Text style={styles.menuLabel}> History </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            accessible={true}
            accessibilityLabel={'Profile, double tap'}
          >
            <MaterialIcons name="person-outline" size={30} color="lightgrey" />
            <Text style={styles.menuLabel}> Profile </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            accessible={true}
            accessibilityLabel={'More, double tap'}
          >
            <MaterialIcons name="more-horiz" size={30} color="lightgrey" />
            <Text style={styles.menuLabel}> More </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export const Header = () => (
  <CommonHeader customStyle={{ justifyContent: 'center' }}>
    <View
      style={HeaderStyles.textWrapper}
      accessible={true}
      accessibilityLabel="Home Page"
    >
      <Image
        source={logo}
        style={HeaderStyles.headerImg}
        resizeMode="contain"
      />
    </View>
  </CommonHeader>
);

// Create component for favourite button, automatically route to pre-filled pay page

const styles = StyleSheet.create({
  //1
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    // alignItems: 'stretch',
  },
  //2
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  menuRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F9F9F9',
  },
  iconRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  balanceRow: {
    flex: 2,
    flexDirection: 'row',
    // borderTopColor: 'lightgrey',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: 'lightgrey',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#FE6D7C',
  },
  //3
  balanceText: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  balanceMenu: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingRight: 15,
  },
  iconButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  menuButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'lightgrey',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  //items
  text: {
    fontSize: 28,
    color: '#FE6D7C',
    fontWeight: 'bold',
  },
  balanceLabel: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
    paddingBottom: 10,
  },
  balance: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  balanceButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 35,

    // width: 60
  },
  icon: {
    height: 50,
    width: 50,
  },
  iconLabel: {
    paddingTop: 10,
    fontSize: 14,
    color: 'black',
    fontWeight: '100',
  },
  menu: {
    height: 25,
    width: 25,
  },
  menuLabel: {
    fontSize: 10,
    color: 'black',
    fontWeight: '100',
  },
  //colors:
  topColor: {
    backgroundColor: 'crimson',
  },
});
