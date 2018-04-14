import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  AccessibilityInfo,
  findNodeHandle,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import CommonHeader from '../components/Header';
import { ContainerStyles, HeaderStyles } from '../components/CommonStyles';
import { RED, GREY, BEIGE } from '../constants/colors';
import { Contact, Contactlist } from '../components/Contact';
import { favourites } from '../data/favourites.json';
import { contacts } from '../data/contacts.json';
import { PayeeList } from '../components/Payee';

export default class SelectNumbers extends React.Component {
  state = {
    payees:
      this.props.navigation.state.params &&
      this.props.navigation.state.params.payees
        ? this.props.navigation.state.params.payees
        : [],
    favourites:
      this.props.navigation.state.params &&
      this.props.navigation.state.params.payees
        ? favourites.filter(
            f =>
              !this.props.navigation.state.params.payees.some(
                p => p.number === f.number,
              ),
          )
        : favourites,
    contacts:
      this.props.navigation.state.params &&
      this.props.navigation.state.params.payees
        ? contacts.filter(
            c =>
              !this.props.navigation.state.params.payees.some(
                p => p.number === c.number,
              ),
          )
        : contacts,
  };

  componentDidMount() {
    const tag = findNodeHandle(this.HeaderElem);
    setTimeout(() => AccessibilityInfo.setAccessibilityFocus(tag), 100);
  }

  addPayee = p => {
    if (this.state.payees.length >= 5) return;
    const favourites = this.state.favourites.map(
      f =>
        f.number !== p.number ? f : Object.assign({}, f, { selected: true }),
    );
    const contacts = this.state.contacts.map(
      c =>
        c.number !== p.number ? c : Object.assign({}, c, { selected: true }),
    );
    const payees = [...this.state.payees, p];
    this.setState({ payees, contacts, favourites });
  };
  removePayee = p => {
    let fav = this.state.favourites;
    const favIdx = fav.findIndex(f => f.number === p.number);
    if (favIdx > -1) {
      fav = [
        ...fav.slice(0, favIdx),
        Object.assign({}, fav[favIdx], { selected: false }),
        ...fav.slice(favIdx + 1),
      ];
    }
    let con = this.state.contacts;
    const conIdx = con.findIndex(c => c.number === p.number);
    if (conIdx > -1) {
      con = [
        ...con.slice(0, conIdx),
        Object.assign({}, con[conIdx], { selected: false }),
        ...con.slice(conIdx + 1),
      ];
    }
    const payees = this.state.payees.filter(pe => pe.number !== p.number);
    this.setState({ payees, favourites: fav, contacts: con });
  };
  search = term => {
    const fav = favourites.filter(
      c => c.name.includes(term) || c.number.includes(term),
    );
    const con = contacts.filter(
      c => c.name.includes(term) || c.number.includes(term),
    );
    this.setState({ favourites: fav, contacts: con });
  };
  backToPage = () => {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.enterPayees
    ) {
      this.props.navigation.goBack();
      this.props.navigation.state.params.enterPayees(this.state.payees);
    } else {
      this.props.navigation.navigate(
        this.props.navigation.state.params.forPage,
        {
          payees: this.state.payees,
        },
      );
    }
  };
  render() {
    const gotPayees = this.state.payees && this.state.payees.length > 0;
    return (
      <View style={[ContainerStyles.container, customStyle.container]}>
        <CommonHeader customStyle={customStyle.header}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Cancel"
            accessibilityComponentType="button"
            onPress={() => this.props.navigation.goBack(null)}
          >
            <EvilIcons
              style={HeaderStyles.headerIcon}
              name="close"
              size={26}
              color={RED}
            />
          </TouchableOpacity>
          <View
            style={HeaderStyles.textWrapper}
            ref={i => (this.HeaderElem = i)}
            accessible={true}
            accessibilityLabel={
              this.props.navigation.state.params.forPage === 'Pay'
                ? 'Choose hey one or more payees from your contact list in the search bar, from your chosen favourites or scroll through your contact list.'
                : this.props.navigation.state.params.forPage === 'Request'
                  ? 'Choose one or more contacts to request from your contact list in the search bar, from your chosen favourites or scroll through your contact list.'
                  : ''
            }
          >
            <Text style={HeaderStyles.headerText}>
              {this.props.navigation.state.params.forPage === 'Pay'
                ? 'Add Payee'
                : this.props.navigation.state.params.forPage === 'Request'
                  ? 'Add Requested Contacts'
                  : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={customStyle.doneBtn}
            accessible={true}
            accessibilityLabel={!gotPayees ? 'Disabled done' : 'Done'}
            accessibilityComponentType="button"
            onPress={gotPayees ? this.backToPage : () => {}}
          >
            <Text accessible={false} style={{ color: gotPayees ? RED : GREY }}>
              DONE
            </Text>
          </TouchableOpacity>
        </CommonHeader>
        <TextInput
          placeholder="Search contacts by name or number"
          style={customStyle.input}
          underlineColorAndroid={'transparent'}
          ref={i => (this.searchTermInput = i)}
          onChangeText={this.search}
        />
        {this.state.payees.length > 0 && (
          <ScrollView
            horizontal={true}
            style={customStyle.payeeContainer}
            contentContainerStyle={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}
            showsHorizontalScrollIndicator={false}
            accessible={false}
          >
            <PayeeList
              payees={this.state.payees}
              onPayeePressed={this.removePayee}
            />
          </ScrollView>
        )}
        {(this.state.favourites.length > 0 ||
          this.state.contacts.length > 0) && (
          <ScrollView style={customStyle.contactContainer} accessible={false}>
            {this.state.favourites.length > 0 && (
              <Contactlist
                title="Favourite contacts"
                contacts={this.state.favourites}
                onPayeeChosen={this.addPayee}
              />
            )}
            {this.state.contacts.length > 0 && (
              <Contactlist
                title="All contacts"
                contacts={this.state.contacts}
                onPayeeChosen={this.addPayee}
              />
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}

const Header = null;

const customStyle = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    height: Platform.OS === 'ios' ? 70 : 50,
    flex: 0,
    width: '100%',
    zIndex: 2,
  },
  container: {
    padding: 0,
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: BEIGE,
    borderBottomWidth: 1,
    borderBottomColor: GREY,
  },
  contactContainer: {
    width: '100%',
  },
  payeeContainer: {
    borderBottomColor: GREY,
    borderBottomWidth: 1,
    alignSelf: 'flex-start',
    minWidth: '100%',
    flexGrow: 0,
  },
  doneBtn: {
    marginRight: 5,
  },
  doneTxt: {
    color: RED,
    fontSize: 15,
  },
});
