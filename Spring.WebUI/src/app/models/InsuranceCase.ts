import { IEntity } from './IEntity'
import {Mkb10} from "./Mkb10";
import {Order} from "./Order";

export abstract class InsuranceCase implements IEntity {
  id: number;
  customerId: number;
  customerName: string;
  caseType: number;
  mkb10: Mkb10;
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
  diagnosisCosts: number;
  foodCosts: number;
  treatmentСosts: number;
  orders: Array<Order>;
}
