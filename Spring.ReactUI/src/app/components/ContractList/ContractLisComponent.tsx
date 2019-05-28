import * as React from 'react';
import { ContractDto } from 'app/generated/dtos/ContractDto';
import ContractItem, { ContractActions } from '../ContractItem/ContractItemComponent';
import { CardDeck } from 'react-bootstrap';

export interface ContractListProps extends ContractActions {
  contracts: ContractDto[];
}

export interface ContractListState {}

export class ContractList extends React.Component<ContractListProps, ContractListState> {
  constructor(props?: ContractListProps, context?: any) {
    super(props, context);
  }

  render() {
    const { contracts } = this.props;
    return (
        <CardDeck>
            {contracts.map((contract) => (
                <ContractItem key={contract.id} contract={contract}  />
            ))}
        </CardDeck>
    );
  }
}

export default ContractList;
