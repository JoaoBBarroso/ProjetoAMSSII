
import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory';
import configureStore from './store';
import { Provider } from 'react-redux';

import Router from './Router';

const history = createHistory();
const store = configureStore(history);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router basename={`${process.env.PUBLIC_URL}`} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;


