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
import { ListByCategory } from '../components/Company';

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
      .reduce((accu, c) => {
        accu[c.company.type] = accu[c.company.type]
          ? [...accu[c.company.type], c]
          : [c];
        return accu;
      }, {});

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
          {Object.keys(filteredCompanies).map(k => (
            <ListByCategory
              key={k}
              title={k}
              companies={filteredCompanies[k]}
              onCompanyPress={this.props.navigation.navigate}
            />
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
});
