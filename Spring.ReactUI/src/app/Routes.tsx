import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from "../components/Home/Home"
import About from "../components/About/About"
import Contracts from "../components/Contract/Contracts"
import ContractEdit from "../components/Contract/ContractEdit";

class Routes extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/contracts" component={Contracts}/>
                <Route path="/contract" component={ContractEdit}/>
            </div>
        );
    }
}

export default Routes;
