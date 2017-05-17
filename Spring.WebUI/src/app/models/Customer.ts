import { IEntity } from './IEntity'
export class Customer implements IEntity {
  id: number;
  name: string;
  tin: string;
  dateOfBirth: Date;
  department: string;
  personnelNumber: string;
  disabilityGroup: number;
  mobilePhone: string;
  position: string;
  additionalInfo:string;
  cardNumber:string;
  sex:Boolean;
  passport:string;
  address:string;
  startDate: Date;
  endDate: Date;
}
