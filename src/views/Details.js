// src/views/Details.js
import React, {useEffect, useState} from 'react';
import {FlatList, Modal, Pressable, SafeAreaView} from 'react-native';

import Product from '../components/Product';
import {connect, Provider, shallowEqual} from 'react-redux';
// import RNRestart from 'react-native-restart';
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
import {Button, Divider, Overlay} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const store = configureStore;
const DetailsScreen = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [subTotal, setsubTotal] = useState(0);
  const [selctedProduct, setselctedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const dispatch = useDispatch();
  const cart = useSelector(state => state.countReducer.cart, shallowEqual);
  const mainData = useSelector(state => state.countReducer.mainData);
  const gettotal = useSelector(state => state.countReducer.subtotal);
  // console.log(mainData)
  // console.log(subTotal);
  const deleteItemFromCart =() => {
    dispatch({
      type : "DELETE_RECORD",
      id : selctedProduct
    });
 setModalVisible(!modalVisible);
 setRefresh(!refresh);
//  RNRestart.Restart();
  }

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
      console.log(gettotal);
    } else {
      setloading(false);
    }
  }, [cart, mainData, gettotal,refresh]);
  const openCloseModal = (id) => {
    setModalVisible(!modalVisible);
    setselctedProduct(id)
  };
  return (
    <ScrollView
     >
      {loading ? (
        <Loader />
      ) : products.length != 0 ? (
        <SafeAreaView style={{flex: 1}}>
          {products.map(item => (
            <Product
              item={item}
              key={item.id}
              withclosebutton={true}
              setModalVisible={openCloseModal}
            />
          ))}
          <View style={styles.priceContainer}>
            <View style={styles.priceSection}>
              <Text style={styles.priceHeadings}>SubTotal</Text>
              <Text style={styles.totalPrice}>${subTotal}</Text>
            </View>

            <Divider style={{backgroundColor: 'blue', height: 1}} />
            <TouchableOpacity
              style={styles.buyButton}
              activeOpacity={0.7}
              onPress={() => {
                null;
              }}>
              <Text style={{fontSize: 21, color: '#ffffff'}}>BUY</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <Text>No items in the Cart! </Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to remove this product from cart?</Text>
            <View style={{flexDirection:"row"}}> 
            <Pressable
              style={[styles.modalbutton, styles.buttonClose]}
              onPress={() =>
                deleteItemFromCart()
                }>
              <Text style={styles.textStyle}>YES</Text>
            </Pressable>
            <Pressable
              style={[styles.modalbutton, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>NO</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
     
    </ScrollView>
  );
};

export default DetailsScreen;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width:250,
    height:150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalbutton: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical:10,
    marginHorizontal:20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buyButton: {
    elevation: 8,
    backgroundColor: '#9999ff',
    borderRadius: 7,
    alignItems: 'center',
    paddingTop: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    width: 255,
    height: 50,
  },
  priceContainer: {
    height: 150,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 13,
    width: '92%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  priceSection: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 110,
    height: 130,
    resizeMode: 'contain',
  },
  priceHeadings: {
    fontSize: 18,
    fontWeight: '400',

    width: 160,
  },
  totalPrice: {
    fontSize: 20,
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
