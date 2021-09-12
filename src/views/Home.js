// src/views/Home.js
import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import { connect, Provider } from 'react-redux';
import Product from '../components/Product';
import FetchProducts from '../functions/fetchProducts';
import configureStore from '../store';
 import  Loader  from './Loader';
const store = configureStore;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainData: {products:props.products, offset: 0, limit: 10},
      cartCount: [],
      loading: true,

    };
   

  };

   handleProductCount =(action) => {
    //  console.log(action)
    const filteredCart = this.state.cartCount.findIndex(({id}) => id == action.id);
     switch(action.type){
       case "INCREMENT":
        // console.log(filteredCart)
        if(filteredCart != -1 ){
          let newVal =  Number.parseInt(action.prevCount)+1;
        const newArr =  this.state.cartCount.map((obj, index) =>{ if(index == filteredCart){obj.count = newVal}; return obj});

          this.setState({...this.state, cartCount: newArr});
          //  console.log("inside addder", 
          //  this.state.cartCount);
          return newVal.toString();
        }
       let newObj = {id: action.id, count:1};
        
        this.setState({cartCount :[...this.state.cartCount, newObj] });
        //  console.log(this.state.cartCount)
         return (Number.parseInt(action.prevCount)+1).toString();
      
      
         case "DECREMENT":
        if(Number.parseInt(action.prevCount) == 0 ){
          return 0;
        }
        let newVal =  Number.parseInt(action.prevCount)-1;
        const newArr =  this.state.cartCount.map((obj, index) =>{ if(index == filteredCart){obj.count = newVal}; return obj});
        this.setState({...this.state, cartCount : newArr});
        
        return newVal.toString();
     }
   
   };


  static navigationOptions =({navigation })=> {
    return {title: 'Title',
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
            paddingRight: 2,
            width: 45,
            height: 44,
          }}
          activeOpacity={0.7}
          onPress={() => {
         navigation.navigate('Details');
          }}>
          <Icon name="shoppingcart" type="antdesign" size={30} />
        </TouchableOpacity>
      </View>
    ),}
  };
  componentDidMount() {
    // this.fetchResult();
    // fetch('https://fakestoreapi.com/products?limit=5')
    // .then(res => res.json())
    // .then(data => {
    //   if (data && data.length > 0) {
    //     console.log('data');
    //     setState(data);
    //   }
    // });
    const products = store.getState().countReducer.mainData;
  if(products != undefined){
   this.setState({mainData : {products : products}, loading: false});
  }
 
  }


  render() {
 
    return (
     
      <View
        style={{
          flexGrow: 0,
          width: '100%',
          height: '100%',
        }}>
        {/* this.state.mainData.products.map((product, index) => {
          return (
            <View style={styles.row} key={index}>
              <View style={styles.col}>
                <Product product={product} />
              </View>
            </View>
          );
         
        })} */}
        <SafeAreaView style={styles.container}>
          {this.state.loading ? (
            <Loader />
          ) : (
            <FlatList
              style={{flex: 1}}
              extraData={this.state.mainData}
              onEndReached={this.fetchResult}
              onEndReachedThreshold={0.7}
              data={this.state.mainData.products}
              renderItem={({item}) => <Product item={item}  withclosebutton={false} updateSubtotal={()=>null}/>}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </SafeAreaView>
      </View>
  
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

const mapStateToProps = state => ({
  products: state.countReducer.mainData
});


const mapDispatchToProps = dispatch => ({
 // increment : () => dispatch(countIncrement)
});

connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default withNavigation(HomeScreen)
