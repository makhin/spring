import * as React from 'react';
import { ContractDto } from 'app/generated/dtos/ContractDto';
import { Card } from 'react-bootstrap';

export interface ContractActions {
}

export interface ContractProps extends ContractActions {
  contract: ContractDto;
}

export interface ContractState {
  editing: boolean;
}

export class ContractItem extends React.Component<ContractProps, ContractState> {
  constructor(props?: ContractProps, context?: any) {
    super(props, context);
    this.state = { editing: false };
  }

  render() {
    const { contract } = this.props;
    return <Card border="primary" style={{ width: '18rem' }} className="">
    <Card.Header>{contract.code}</Card.Header>
        <Card.Body>
        <Card.Title>{contract.name}</Card.Title>
        <Card.Text>
            {contract.description}
        </Card.Text>
        </Card.Body>
    </Card>;
  }
}

export default ContractItem;
