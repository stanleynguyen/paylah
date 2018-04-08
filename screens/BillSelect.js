import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import companies from '../data/companies';
import CommonHeader from '../components/Header';
import { EvilIcons } from '@expo/vector-icons';
import { HeaderStyles } from '../components/CommonStyles';
import { RED, BEIGE, GREY, WHITE } from '../constants/colors';

const KEYS_TO_FILTERS = ['company.name', 'company.type'];

export default class BillSelect extends React.Component {
  state = {
    searchTerm: '',
  };

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  render() {
    const filteredCompanies = companies
      .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
      .sort((a, b) => a.company.name > b.company.name);
    return (
      <View style={styles.container}>
        <CommonHeader customStyle={styles.header}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Close"
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
            accessible={true}
            accessibilityLabel="Choose an organisation by searching in the search box or scrolling through the list of the institution"
          >
            <Text style={HeaderStyles.headerText}>Select Organisation</Text>
          </View>
        </CommonHeader>
        <SearchInput
          onChangeText={term => {
            this.searchUpdated(term);
          }}
          style={styles.searchInput}
          placeholder="Search organisation"
        />
        <ScrollView style={styles.companiesList}>
          {filteredCompanies.map(item => (
            <TouchableOpacity
              accessible={true}
              accessibilityComponentType="button"
              accessibilityLabel={`Double tap to choose organisation ${
                item.company.name
              }`}
              onPress={() =>
                this.props.navigation.navigate('Bill', {
                  payee: item.company,
                })
              }
              key={item.id}
              style={styles.company}
            >
              <View accessible={false} style={styles.avatar}>
                <Text style={styles.avaTxt}>
                  {item.company.name[0].toUpperCase()}
                </Text>
              </View>
              <View style={styles.details}>
                <Text>{item.company.name}</Text>
                <Text style={styles.companyType}>{item.company.type}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  companiesList: {
    padding: 10,
    width: '100%',
  },
  company: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
  },
  companyType: {
    color: 'rgba(0,0,0,0.5)',
  },
  searchInput: {
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
  header: {
    zIndex: 1,
  },
  avatar: {
    height: 40,
    width: 40,
    backgroundColor: GREY,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avaTxt: {
    color: WHITE,
    fontSize: 25,
  },
  details: {
    marginLeft: 10,
    justifyContent: 'space-around',
  },
});
