// src/views/Details.js
import React from 'react';
import {  FlatList, SafeAreaView } from 'react-native';

import Product from '../components/Product';

import { Loader } from './Home';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

class DetailsScreen extends React.Component {
    render() {
      const { navigation } = this.props;
      const products = navigation.getParam('products');
      const cartList = navigation.getParam('cartList');
     const loading = false;

      return (
        <SafeAreaView style={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <FlatList
              style={{flex: 1}}
              // extraData={this.state.mainData}
              // onEndReached={this.fetchResult}
              onEndReachedThreshold={0.7}
              data={products}
              renderItem={({item}) => <Product item={item} />}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </SafeAreaView>
      );
    }
}

export default DetailsScreen;
const styles = StyleSheet.create({
  button: {
    elevation: 8,
    backgroundColor: '#ffffff',
    borderRadius: 7,
    paddingVertical: 5,
    width: 35,
    height: 30,
  },

  name: {
    color: '#5a647d',
    fontWeight: 'bold',
    fontSize: 30,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 10,
    color: '#c1c4cd',
  },
  wrapper: {
    flexDirection: 'row',
    height: 150,
    display: 'flex',
    alignItems: 'center',
    padding: 14,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    marginHorizontal: 13,
    width: '92%',
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 110,
    height: 130,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 15,
    fontWeight: '400',

    width: 160,
  },
  price: {
    fontSize: 16,
    color: '#303540',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rightContent: {
    height: 120,
    display: 'flex',

    justifyContent: 'space-between',
  },
});