
import React from 'react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import configureStore from './store';

import Router from './Router';

const history = createHistory();
const store = configureStore(history);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Router basename={`${process.env.PUBLIC_URL}`} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

