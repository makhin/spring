import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { TodoModel } from './models/TodoModel';
import { createStores } from './stores/createStore';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel);

import './index.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {AppRouter} from "./components/Router";

const rootElement = document.getElementById("root");

// default fixtures for TodoStore
const defaultTodos = [
    new TodoModel('Use Mobx'),
    new TodoModel('Use React', true)
];

// prepare MobX stores
const history = createBrowserHistory();
const rootStore = createStores(history, defaultTodos);

ReactDOM.render(
<Provider {...rootStore}>
            <AppRouter />
        </Provider>,
    rootElement
);
