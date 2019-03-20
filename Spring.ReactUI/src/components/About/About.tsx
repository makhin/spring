import React from "react";
import {match, Route} from "react-router";
import {Link} from "react-router-dom";

class About extends React.Component<{match: match}, any> {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to={`${this.props.match.url}/technology`}>Technology</Link></li>
                    <li><Link to={`${this.props.match.url}/business`}>Business</Link></li>
                    <li><Link to={`${this.props.match.url}/economics`}>Economics</Link></li>
                </ul>

                <Route exact path={`${this.props.match.path}/:course`} render={({match}) => (<div> This is {match.params.course} </div>)}/>
            </div>
        );
    }
}

export default About;