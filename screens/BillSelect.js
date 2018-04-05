import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import companies from '../data/companies';
const KEYS_TO_FILTERS = ['company.name', 'company.type'];

export default class BillSelect extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  render() {
    const filteredCompanies = companies.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <View style={styles.container}>
        <SearchInput 
          onChangeText={(term) => { this.searchUpdated(term) }} 
          style={styles.searchInput}
          placeholder="Search company"
          />
        <ScrollView>
          {filteredCompanies.map(item => {
            return (
              <TouchableOpacity onPress={()=>alert(item.company.name)} key={item.id} style={styles.companyName}>
                <View>
                  <Text>{item.company.name}</Text>
                  <Text style={styles.companyType}> {item.company.type} </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}


// this.props.navigation.navigate('Bill', { pagename: 'Pay Bills', payee:this.state.payee, amount:this.state.amount, message:this.state.message})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  companyName:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  companyType: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});
