import * as React from 'react';
import {Col, Container, Row} from "reactstrap";

export class Root extends React.Component<any, any> {
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools />;
    }
  }

  render() {
    return (
        <Container>
            <Row>
                <Col>
                    {this.props.children}
                    {this.renderDevTool()}
                </Col>
            </Row>
        </Container>
    );
  }
}
