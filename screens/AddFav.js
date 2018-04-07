import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';

import CommonHeader from '../components/Header';
import { contacts } from '../data/contacts.json';
import { ContainerStyles, HeaderStyles } from '../components/CommonStyles';
import { TextInput } from 'react-native-gesture-handler';
import { Contactlist } from '../components/Contact';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { RED, BEIGE, GREY } from '../constants/colors';

export default class AddFav extends React.Component {
  state = {
    contacts,
  };

  search = term => {
    const contacts = contacts.filter(
      c => c.name.includes(term) || c.number.includes(term),
    );
    this.setState({ contacts });
  };

  render() {
    return (
      <View style={[ContainerStyles.container, customStyle.container]}>
        <TextInput
          placeholder="Search contacts by name or number"
          style={customStyle.input}
          underlineColorAndroid={'transparent'}
          ref={i => (this.searchTermInput = i)}
          onChangeText={this.search}
        />
        {this.state.contacts.length > 0 && (
          <ScrollView style={customStyle.contactContainer} accessible={false}>
            <Contactlist
              title="All contacts"
              contacts={this.state.contacts}
              onPayeeChosen={() => this.props.navigation.goBack(null)}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

export const Header = ({ navigation }) => (
  <CommonHeader>
    <TouchableOpacity
      accessible={true}
      accessibilityLabel="Close"
      accessibilityComponentType="button"
      onPress={() => navigation.goBack(null)}
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
      accessible={true}
      accessibilityLabel="Add a contact to favourite list by searching and choosing from this contact list"
    >
      <Text style={HeaderStyles.headerText}>Add To Favourites</Text>
    </View>
    <View style={{ width: 18 }} />
  </CommonHeader>
);

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
