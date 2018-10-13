import * as React from 'react';
import {Header} from "./Header";
import Container from 'reactstrap/lib/Container';

export interface IAppProps {
    children: any;
}

export const App: React.StatelessComponent<{}> = (props) => {
    return (
        <Container fluid={true}>
            <Header />
        </Container>
    );
}