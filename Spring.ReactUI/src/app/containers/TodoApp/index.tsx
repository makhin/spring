import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import {
  STORE_ROUTER,
  REPO_CONTRACTS
} from 'app/constants';
import ContractsRepository from 'app/repositories/ContractsRepository';
import ContractList from 'app/components/ContractList';
import { action, observable } from 'mobx';
import { Container } from 'react-bootstrap';

export interface TodoAppProps extends RouteComponentProps<any> {
}

export interface TodoAppState {
}

@inject(STORE_ROUTER, REPO_CONTRACTS)
@observer
export class TodoApp extends React.Component<TodoAppProps, TodoAppState> {  
  @observable contracts = [];

  constructor(props: TodoAppProps, context: any) {
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

  componentWillReceiveProps(nextProps: TodoAppProps, nextContext: any) {
    this.checkLocationChange();
  }

  checkLocationChange() {
  }

  render() {
    return (
      <Container id="wrapper">
        <ContractList contracts={this.contracts} />
      </Container>
    );
  }
}
