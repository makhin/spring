import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from "../components/Home/Home"
import Courses from "../components/Courses/Courses"
import City from "../components/City/City"
import NotFound from "../components/NotFound/NotFound";

class Routes extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={Home}/>
                <Route path="/courses" component={Courses}/>
                <Route path="/cities" component={City}/>
                <Route path="*" component={NotFound}/>
            </div>
        );
    }
}

export default Routes;
