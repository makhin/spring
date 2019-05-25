import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { TodoModel } from 'app/models';
import { createStores } from 'app/stores';
import { App } from 'app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRepositories } from 'app/repositories/CreateRepositories';

// default fixtures for TodoStore
const defaultTodos = [
  new TodoModel('Use Mobx'),
  new TodoModel('Use React', true)
];

// prepare MobX stores
const history = createBrowserHistory();
const rootStore = createStores(history, defaultTodos);
const rootRepository = createRepositories();
let mergedStore = {...rootStore, ...rootRepository};

// render react DOM
ReactDOM.render(
  <Provider {...mergedStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
