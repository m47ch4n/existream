import React from 'react';
import { hydrate, render } from "react-dom";
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configureStore'
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Home from './pages/Home'
import Lobby from './pages/Lobby'

const store = configureStore()

const contents = (
  <Provider store={ store }>
    <App>
      <ConnectedRouter history={ history }>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby" component={Lobby} />
        </Switch>
      </ConnectedRouter>
    </App>
  </Provider>
)

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(contents, rootElement);
} else {
  render(contents, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
