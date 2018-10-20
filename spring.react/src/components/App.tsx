import * as React from 'react';
import { Root } from '../containers/Root/Root';
import { TodoApp } from '../containers/TodoApp';
import {Route, Router, Switch} from "react-router";

export const App = ({history}) => (
    <Root>
        <Router history={history}>
            <Switch>
                <Route path="/" component={TodoApp}/>
            </Switch>
        </Router>
    </Root>
);

