// src/views/Home.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Product from '../components/Product';

const BASE_URL = 'https://raw.githubusercontent.com/sdras/sample-vue-shop/master/dist';

const products = [
  {
    name: 'Khaki Suede Polish Work Boots',
    price: 149.99,
    img: `${BASE_URL}/shoe1.png`
  },
  {
    name: 'Camo Fang Backpack Jungle',
    price: 39.99,
    img: `${BASE_URL}/jacket1.png`
  },
  {
    name: 'Parka and Quilted Liner Jacket',
    price: 49.99,
    img: `${BASE_URL}/jacket2.png`
  },
  {
    name: 'Cotton Black Cap',
    price: 12.99,
    img: `${BASE_URL}/hat1.png`
  },
];

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Title",
    headerLeft: ()=>(
      <Icon name='ios-menu-outline' color='#000' size={26} style={{ paddingLeft: 15, width: 40 }}  />
    ),
    headerRight: () =>(
      <View style={{ flexDirection: "row",
      justifyContent: "space-evenly",
      width: 120}}>
        

            <Button 
    icon={{name: 'envira', type: 'font-awesome'}} 
    size={30} buttonStyle={{}}/>
{/* <Icon type="ionicon" name={Platform.OS === "ios" ? "ios-search" : "heartbeat"} type='font-awesome' />
        <Icon type="ionicon" name={Platform.OS === "ios" ? "ios-heart" : "md-heart"} />
        <Icon type="ionicon" name={Platform.OS === "ios" ? "ios-more" : "md-more"} /> */}
        
      </View>
    )
  };
    render() {
      return (
        <ScrollView
          style={{
            flexGrow: 0,
            width: "100%",
            height: "100%",
          }}>
          {
            products.map((product, index) => {
              return(
                <View style={styles.row} key={index}>
                    <View style={styles.col}>
                      <Product product={product}/>
                    </View>
                </View>
              )
            })
          }
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
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  },
  container: {
    flex: 1
  },
});

export default withNavigation(HomeScreen);