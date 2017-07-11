import { IEntity } from './IEntity'
export class InsuranceCaseItem implements IEntity {
  id: number;
  mkb10Code: string;
  treatment: string;
  hospitalName: string;
  beginDate: Date;
  endDate: Date;
  totalAmount: number;
}
