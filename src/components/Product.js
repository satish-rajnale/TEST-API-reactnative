// src/components/Product.js
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Card, Button, Image, Input} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {withNavigation} from 'react-navigation';

function Product({item}) {
    const [productCount, setProductCount] = useState("0");
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{uri: item.image}} />
      </View>
      <View style={styles.rightContent}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <View
          style={[
            styles.rightContent,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 180,
            },
          ]}>
          <Text style={styles.price}>${item.price}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignContent: 'space-around',
            }}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => {
                setProductCount((prevCount) => (Number.parseInt(prevCount)-1).toString());
              }}>
              <Icon name="minus" type="font-awesome" size={20} />
            </TouchableOpacity>
            <TextInput
                 textAlign={'center'}
              style={{
                backgroundColor: 'whitesmoke',
                height: 32,
                width: 32,
                padding:0,

           
                color:"#000000",
                marginHorizontal: 5,
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 7,
                marginBottom: 5,
              }}

              value={String(productCount)}
            />
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => {
               setProductCount((prevCount) => (Number.parseInt(prevCount)+1).toString());
              }}>
              <Icon name="plus" type="font-awesome" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

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

export default withNavigation(Product);
