import { IEntity } from './IEntity'
export class InsuranceCaseItem implements IEntity {
  id: number;
  customerId: number;
  mkb10: string;
  treatment: string;
  hospital: string;
  beginDate: Date;
  endDate: Date;
}
