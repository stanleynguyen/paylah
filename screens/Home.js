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
import { favourites } from '../data/favourites';
import { HeaderStyles } from '../components/CommonStyles';
import { RED } from '../constants/colors';

export default class Home extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    const name = ['Bella', 'Valerie', 'Stanley', 'Michelle'];
    return (
      <View style={styles.container}>
        <View
          style={styles.titleRow}
          accessible={true}
          accessibilityLabel={'Wallet Features, heading'}
        >
          <Text style={styles.title}> Wallet Features </Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Pay Money, double tap'}
            onPress={() => navigate('SelectNumbers', { forPage: 'Pay' })}
          >
            <FontAwesome name="send" size={40} />
            <Text style={styles.iconLabel}> Pay </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Request Money, double tap'}
            onPress={() => navigate('SelectNumbers', { forPage: 'Request' })}
          >
            <MaterialIcons name="message" size={45} />
            <Text style={styles.iconLabel}> Request </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Scan QR to Pay, double tap'}
          >
            <Ionicons name="md-qr-scanner" size={40} />
            <Text style={styles.iconLabel}> Scan QR </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            accessible={true}
            accessibilityLabel={'Pay Bills, double tap'}
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
              <Text style={{ color: RED }}> Top-up </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceButton}>
              <Text style={{ color: RED }}> Withdraw </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.titleRow}>
          <View
            style={styles.textRow}
            accessible={true}
            accessibilityLabel="Favourites"
          >
            <Text style={styles.text}> Favourite </Text>
          </View>
          <TouchableOpacity
            style={styles.extraRow}
            accessible={true}
            accessibilityLabel="See all favorite contacts"
            accessibilityComponentType="button"
            // onPress={() => navigate('AddFav')}
          >
            <Text style={styles.extra}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconRow}>
          {favourites.slice(1, 4).map(p => (
            <TouchableOpacity
              key={p.id}
              style={styles.iconButton}
              accessible={true}
              accessibilityLabel={`Pay to ${p.name}`}
              accessibilityComponentType="button"
              onPress={() => navigate('Pay', { payees: [p] })}
            >
              <View accessible={false} style={styles.favAva}>
                <Text style={styles.avaText}>{p.name[0].toUpperCase()}</Text>
              </View>
              <Text style={styles.iconLabel}>{p.name.substring(0, 9)}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.iconButton, styles.addIcon]}
            accessible={true}
            accessibilityLabel="Add new favorite contact"
            accessibilityComponentType="button"
            onPress={() => navigate('AddFav')}
          >
            <View accessible={false} style={styles.addCircle}>
              <Text style={[styles.avaText, { color: RED }]}>+</Text>
            </View>
            <Text style={[styles.iconLabel, { color: RED }]}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleRow}>
          <View
            style={styles.textRow}
            accessible={true}
            accessibilityLabel="Bills shortcut"
          >
            <Text style={styles.text}>Bills Shortcut</Text>
          </View>
        </View>

        <View style={styles.iconRow}>
          {companies.slice(0, 4).map(c => (
            <TouchableOpacity
              key={c.id}
              style={styles.iconButton}
              accessibilityLabel={`Pay to ${c.company.name}`}
              onPress={() => navigate('Bill', { payee: c.company })}
            >
              <View accessible={false} style={styles.favAva}>
                <Text style={styles.avaText}>
                  {c.company.name[0].toUpperCase()}
                </Text>
              </View>
              <Text style={styles.iconLabel}>
                {c.company.name.substring(0, 9)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.menuRow}>
          <TouchableOpacity
            style={styles.menuButton}
            accessible={true}
            accessibilityLabel={'Home Menu, double tap'}
            // onPress={() => navigate('Home', { pagename: 'Home' })}
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
    alignItems: 'stretch',
  },
  menuRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F9F9F9',
  },
  iconRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  iconButton: {
    width: '25%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  balanceRow: {
    flex: 2,
    flexDirection: 'row',
    // borderTopColor: 'lightgrey',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: 'lightgrey',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: RED,
  },
  textRow: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  extraRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
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
  menuButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'lightgrey',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  //items
  title: {
    flex: 2,
    fontSize: 18,
    color: RED,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 15,
  },
  text: {
    flex: 2,
    fontSize: 18,
    color: RED,
    fontWeight: 'bold',
    paddingLeft: 10,
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
  favAva: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avaText: {
    color: 'white',
    fontSize: 25,
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
  extra: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    // borderRadius: 10,
    // borderColor: RED,
    // borderWidth: StyleSheet.hairlineWidth,
    color: RED,
    padding: 8,
  },
  addIcon: {},
  addCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: RED,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
