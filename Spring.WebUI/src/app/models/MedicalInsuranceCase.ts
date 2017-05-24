import { IEntity } from './IEntity'
import {Hospital} from "./Hospital";
import {Mkb10} from "./Mkb10";
import {Order} from "./Order";
export class InsuranceCase implements IEntity {
  id: number;
  customerId: number;
  mkb10: Mkb10;
  hospital: Hospital;
  hospitalId: number;
  hospitalDepartmentId:number;
  therapy: string;
  treatment: string;
  beginDate:Date;
  endDate:Date;
}

export class MedicalInsuranceCase extends InsuranceCase {
  reportDate: Date;
  documentDate: Date;
  orders: Array<Order>;
}

