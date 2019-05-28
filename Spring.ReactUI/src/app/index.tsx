import * as React from 'react';
import DevTools from 'mobx-react-devtools';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import { SpringApp } from 'app/containers/SpringApp';

// render react DOM
export const App = hot(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route path="/" component={SpringApp} />
      </Switch>
    </Router>
    <DevTools />
  </Root>
));
