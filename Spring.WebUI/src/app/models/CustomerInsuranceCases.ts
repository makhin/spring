import { IEntity } from './IEntity'
import {InsuranceCaseItem} from './InsuranceCaseItem';
export class CustomerInsuranceCases implements IEntity {
  id: number;
  name: string;
  contractId: number;
  insuranceCases: Array<InsuranceCaseItem>;
}
