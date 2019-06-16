import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import productReducer from './Redux/ProductScanning';
import InitialNavigator from './InitialNavigator';

const store = createStore(productReducer);

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
        <InitialNavigator
        // screenProps={{
        //   productData: this.state.productData,
        //   isLoading: this.state.isLoading,
        //   isLoaded: this.state.isLoaded,
        //   error: this.state.error,
        // }} 
        />
      </Provider>
    );
  }
}
