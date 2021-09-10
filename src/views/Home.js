// src/views/Home.js
import React from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import Product from '../components/Product';
import FetchProducts from "../functions/fetchProducts"
// const BASE_URL =
//   'https://raw.githubusercontent.com/sdras/sample-vue-shop/master/dist';


// const products = [
//   {
//     name: 'Khaki Suede Polish Work Boots',
//     price: 149.99,
//     img: `${BASE_URL}/shoe1.png`,
//   },
//   {
//     name: 'Camo Fang Backpack Jungle',
//     price: 39.99,
//     img: `${BASE_URL}/jacket1.png`,
//   },
//   {
//     name: 'Parka and Quilted Liner Jacket',
//     price: 49.99,
//     img: `${BASE_URL}/jacket2.png`,
//   },
//   {
//     name: 'Cotton Black Cap',
//     price: 12.99,
//     img: `${BASE_URL}/hat1.png`,
//   },
// ];
const Loader = () => {
  const loaderStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });
  return(
    <View style={styles.loaderStyles}>
   
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
  )
}
class HomeScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      products : [],
      loading: true
    }
  }
  static navigationOptions = {
    title: 'Title',
    // headerLeft: ()=>(
    //   <Icon
    //      containerStyle={{paddingLeft: 10}}
    //     type="Ionicons"
    //     name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
    //   />
    // ),
    headerRight: () => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: 120,
        }}>
        <TouchableOpacity
          style={{
            elevation: 8,
            backgroundColor: '#ffffff',
            borderRadius: 10,
            paddingVertical: 8,
            paddingRight:2,
            width: 45,
            height: 44,
          }}
          activeOpacity={0.7}
          onPress={() => {
            console.log('clicked');
          }}>
          <Icon name="shoppingcart" type="antdesign" size={30} />
        </TouchableOpacity>
      </View>
    ),
  };
  componentDidMount(){
    fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
    if(data && data.length > 0){
      this.setState({products: data, loading: false})
    }
  })
  }
  render() {
    return (
      <ScrollView
        style={{
          flexGrow: 0,
          width: '100%',
          height: '100%',
        }}>
        {this.state.loading ? <Loader/> : this.state.products.map((product, index) => {
          return (
            <View style={styles.row} key={index}>
              <View style={styles.col}>
                <Product product={product} />
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  col: {
    flex: 1,
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  },
  container: {
    flex: 1,
  },
});

export default withNavigation(HomeScreen);
