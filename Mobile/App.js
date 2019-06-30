
import React, { Component } from "react";
import { Provider } from 'react-redux'
import { createSimpleStore } from './configureStore';
import InitialNavigator from './InitialNavigator';

let store = createSimpleStore();
export default class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <InitialNavigator
        />

      </Provider>
    );
  }
}





