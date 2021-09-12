import * as types from '../actions';

export const initialState = {
  mainData: [],
  cart: [],
  subtotal: 0,
};

function somereducer(action) {
  switch (action.type) {
    case types.INCREMENT_COUNT:
      incrementCartCount(response.id);
      return {...state};
    case types.REDUCE_COUNT:
      state.loginId = response.data;
      return {...state};
    default:
      return state;
  }
}

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT_COUNT:
      incrementCartCount(state, action.id);
      
      return {...state};
    case types.REDUCE_COUNT:
      reduceCartCount(state, action.id);
      return {...state};
    case types.STORE_MAIN_DATA:
      state.mainData = action.payload;
      //console.log("set data", state)
      return {
        ...state,
      };
      case types.SET_SUBTOTAL:
        if (state.cart.length != 0) {
        const prodList = [];
        for (let obj of state.mainData) {
          for (let cartObj of state.cart) {
            if (cartObj.id == obj.id) {
              prodList.push(obj);
            }
          }
        }
        let subtotalCalc =  state.cart.reduce((acc, val) => {return acc += val.count},0) * prodList.reduce((acc, val) => {return acc += val.price}, 0);
      state.subtotal = subtotalCalc.toFixed(2);
        }
        return {
          ...state,
        };
        case types.DELETE_RECORD:
          deleteRecord(state,action.id);
          return {
            ...state,
          };
        default:
      return state;
  }
};
export default countReducer;

const incrementCartCount = (state, receivedId) => {
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

const reduceCartCount = (state, receivedId) => {
  const isInCart = state.cart.findIndex(obj => obj.id == receivedId);
  if (isInCart != -1) {
    if (state.cart[isInCart].count != 0) {
      let newVal = Number.parseInt(state.cart[isInCart].count) - 1;
     
        state.cart[isInCart].count = newVal;

     
      state.cart[isInCart].count = newVal;
      return newVal.toString();
    }
  }
  return 0;
};


const deleteRecord = (state, id) => {
  const isInCart = state.cart.findIndex(obj => obj.id == id);
  if (isInCart != -1) {
    // console.log(state.cart)
     state.cart.splice(isInCart,1);
    // console.log( state.cart)
    return state.cart
  }
  console.log("nothing")
  return null
}