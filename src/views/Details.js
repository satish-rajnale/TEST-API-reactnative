// src/views/Details.js
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';

import Product from '../components/Product';
import {connect, Provider, shallowEqual} from 'react-redux';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import configureStore from '../store';
import Loader from './Loader';

const store = configureStore;
const DetailsScreen = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [subTotal, setsubTotal] = useState(0);
 
  const dispatch = useDispatch();
  const cart = useSelector(state => state.countReducer.cart, shallowEqual);
  const mainData = useSelector(state => state.countReducer.mainData);
  const gettotal = useSelector(state => state.countReducer.subtotal);
  // console.log(mainData)
   console.log(subTotal)

  useEffect(() => {
    if (cart.length != 0) {
      const prodList = [];
      for (let obj of mainData) {
        for (let cartObj of cart) {
          if (cartObj.id == obj.id) {
            prodList.push(obj);
          }
        }
      }
    
      setproducts(prodList);
      setloading(false);
      setsubTotal(gettotal);
      console.log(gettotal)
    } else {
      setloading(false);
    }
  }, [cart, mainData ,gettotal]);
  const updateSubtotal = () => {
    dispatch({
      type: "SET_SUBTOTAL"
    });
  }
  return (
    <View
      style={{
        flexGrow: 0,
        width: '100%',
        height: '100%',
      }}>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <Loader />
        ) : products.length != 0 ? (
          <View>
            {products.map(item => (
              <Product item={item} key={item.id} withclosebutton={true} updateSubtotal={updateSubtotal} />
            ))}
            <View><Text>SubTotal</Text><Text>${subTotal}</Text></View>
            
          </View>
        ) : (
          <Text>No items in the Cart! </Text>
        )}
      </SafeAreaView>
    </View>
  );
};

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
