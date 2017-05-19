import { IEntity } from './IEntity'
export class InsuranceCaseItem implements IEntity {
  id: number;
  customerId: number;
  mkb10Code: string;
  threatment: string;
  hospitalName: string;
  beginDate: Date;
  endDate: Date;
}
