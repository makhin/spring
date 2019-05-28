import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { App } from 'app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRepositories } from 'app/repositories/CreateRepositories';
import { createStores } from 'app/stores/createStore';

// prepare MobX stores
const history = createBrowserHistory();
const rootStore = createStores(history);
const rootRepository = createRepositories();
let mergedStore = {...rootStore, ...rootRepository};

// render react DOM
ReactDOM.render(
  <Provider {...mergedStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
