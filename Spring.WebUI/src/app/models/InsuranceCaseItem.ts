import { IEntity } from './IEntity'
import {Hospital} from "./Hospital";
import {Mkb10} from "./Mkb10";

export class InsuranceCaseItem implements IEntity {
  id: number;
  customerId: number;
  mkb10: Mkb10;
  treatment: string;
  hospital: Hospital;
  beginDate: Date;
  endDate: Date;
}
