import * as React from 'react';
import {Link} from 'react-router-dom';

export const HomePage: React.StatelessComponent<{}> = () => {
    return (
        <div>
            <h1>About</h1>
            <p>This application uses React, Redux, React Router and a variety of other helpful libraries.</p>
            <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
        </div>
    );
}