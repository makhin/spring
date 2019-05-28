import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import ContractsRepository from 'app/repositories/ContractsRepository';
import { action, observable } from 'mobx';
import { Container, Row, Col } from 'react-bootstrap';
import { ContractList } from 'app/components/ContractList/ContractLisComponent';
import Navigation from 'app/components/Navigation/NavigationComponent';
import { STORE_ROUTER } from 'app/constants/stores';
import { REPO_CONTRACTS } from 'app/constants/repositories';

export interface SpringAppProps extends RouteComponentProps<any> {
}

export interface SpringAppState {
}

@inject(STORE_ROUTER, REPO_CONTRACTS)
@observer
export class SpringApp extends React.Component<SpringAppProps, SpringAppState> {  
  @observable contracts = [];

  constructor(props: SpringAppProps, context: any) {
    super(props, context);
    this.loadContracts();
  }

  @action 
  async loadContracts(): Promise<any> {
    const contractsRepo = this.props[REPO_CONTRACTS] as ContractsRepository;
    this.contracts = await contractsRepo.getAll();
  }

  componentWillMount() {
    this.checkLocationChange();
  }

  componentWillReceiveProps(nextProps: SpringAppProps, nextContext: any) {
    this.checkLocationChange();
  }

  checkLocationChange() {
  }

  render() {
    return (    
      <div id="wrapper">  
        <Navigation/>
        <Container fluid = { true }>
          <Row>
            <Col>
              <ContractList contracts={this.contracts} />
            </Col>
          </Row>        
        </Container>
      </div>
    );
  }
}
