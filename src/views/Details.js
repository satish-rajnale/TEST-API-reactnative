// src/views/Details.js
import React, { useEffect, useState } from 'react';
import {  FlatList, SafeAreaView } from 'react-native';

import Product from '../components/Product';
import { connect, Provider } from 'react-redux';


import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import configureStore from '../store';
import  Loader  from './Loader';
 
const store = configureStore;
const DetailsScreen = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.countReducer.cart);
  const mainData = useSelector((state) => state.countReducer.mainData);
  // console.log(mainData)
  console.log(products)

  useEffect(() => {
    if(cart.length != 0){
      const prodList = [];
      for(let obj of mainData){
        for(let cartObj of cart){
          if(cartObj.id == obj.id){
            prodList.push(obj)
          }
        }
      }
    //  const detailsArr =   mainData.filter(obj => obj.id == cartObj.id);
    //  console.log(detailsArr)
     setproducts(prodList);
     setloading(false)
    };

  }, [cart,mainData ]);


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
          ) : products.map((item) => (
            <Product item={item} key={item.id} withclosebutton={true}/>
          ))}
          
        </SafeAreaView>
     </View>
      );
    
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