import {createAppContainer} from 'react-navigation';
import AppNavigator from './src/AppNavigator';
import configureStore from './src/store';
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Loader from './src/views/Loader';
import {SafeAreaView} from 'react-native';
const store = configureStore;
const Appcontainer = createAppContainer(AppNavigator);

const App = () => {
  const [state, setState] = useState([]);
  const [loading, setloading] = useState(true);
  const mainData = useSelector((state) => state.countReducer.mainData);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('fetching');
    fetch('https://fakestoreapi.com/products?limit=5')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          console.log('data');
          setState(data);
        }
      });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'STORE_MAIN_DATA',
      payload: state,
    });
    if(mainData.length != 0){
        setloading(false);
    }
    
  }, [state,mainData]);
  return (
    <SafeAreaView style={{ flex: 1,}}>
      {loading ? (
        <Loader />
      ) : (
        <Provider store={store}>
          <Appcontainer />
        </Provider>
      )}
    </SafeAreaView>
  );
};

export default App;
