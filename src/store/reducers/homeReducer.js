import * as types from '../actions';

export const initialState = {
  mainData: [],
  cart: [],
  count: 0,
};

function somereducer(action) {
  switch (action.type) {
    case types.INCREMENT_COUNT:
      incrementCartCount(response.id);
      return state;
    case types.REDUCE_COUNT:
      state.loginId = response.data;
      return state;
    default:
      return state;
  }
}

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.COUNTER_CHANGE:
     // console.log('got in reducer');
      incrementCartCount(state,action.id);
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default countReducer;





const incrementCartCount = (state,receivedId )=> {
  const isInCart = state.cart.findIndex(obj => obj.id == receivedId);
  if (isInCart != -1) {
  //  console.log('isInCart');
    let newVal = Number.parseInt(state.cart[isInCart].count) + 1;
    state.cart[isInCart].count = newVal;
   // console.log(state.cart);
    return newVal.toString();
  }
  state.cart.push({id: receivedId, count: 1});
  //console.log(state);
  return 0;
};
