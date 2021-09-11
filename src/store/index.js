import { createStore, compose, applyMiddleware } from 'redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducers from './reducers'; // where reducers is a object of reducers
import {initialState} from "./reducers/homeReducer"
const middleware = [];

const enhancers = [applyMiddleware(...middleware)];

const store = createStore(rootReducers,);


export default store;