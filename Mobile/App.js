
// import React, { Component } from "react";
// import { StyleSheet, Text, View } from 'react-native';
// import { Provider } from 'react-redux'
// import { createStore } from 'redux';
// import productReducer from './Redux/ProductScanning';
// // import productReducer from './Redux/reducers/productScanning';
// import InitialNavigator from './InitialNavigator';

// const store = createStore(productReducer);

// export default class App extends Component {

//   constructor(props) {
//     super(props)
//     // state = {
//     //   productData: null,
//     //   isLoading: false,
//     //   isLoaded: false,
//     //   error: null,
//     // }
//   }

//   render() {
//     return (
//       <Provider store={store}>
//         <InitialNavigator
//         // screenProps={{
//         //   productData: this.state.productData,
//         //   isLoading: this.state.isLoading,
//         //   isLoaded: this.state.isLoaded,
//         //   error: this.state.error,
//         // }} 
//         />
//       </Provider>
//     );
//   }
// }

import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createReduxStore, persistedReduxStore, createSimpleStore } from './configureStore';
import productReducer from './Redux/ProductScanning';
import InitialNavigator from './InitialNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/Loader';
import { readSearchedProduct } from "./Redux/storage/productScanning";
import { loadData } from "./Redux/actions/creators";

let store = createSimpleStore();
// let store = createReduxStore();
// let persistor = persistedReduxStore();

// readSearchedProduct().then(searchedProduct => {
//   store.dispatch(loadData(searchedProduct));
// });


export default class App extends Component {

  constructor(props) {
    super(props)
    // state = {
    //   productData: null,
    //   isLoading: false,
    //   isLoaded: false,
    //   error: null,
    // }
  }

  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
        <InitialNavigator
        // screenProps={{
        //   productData: this.state.productData,
        //   isLoading: this.state.isLoading,
        //   isLoaded: this.state.isLoaded,
        //   error: this.state.error,
        // }} 
        />
        {/* </PersistGate> */}

      </Provider>
    );
  }
}
