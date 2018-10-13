import * as React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import {App} from "./App";
import {AboutPage} from "./About/AboutPage";
import {ContractsPage} from "./Contracts/ContractsPage";

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <HashRouter>
            <div className="container-fluid">
                <Route component={App} />
                <Switch>
                    <Route exact path="/" component={AboutPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/contracts" component={ContractsPage} />
                </Switch>
            </div>
        </HashRouter>
    );
}