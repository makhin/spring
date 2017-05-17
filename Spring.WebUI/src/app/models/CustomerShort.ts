import { IEntity } from './IEntity'
export class CustomerShort implements IEntity {
  id: number;
  department: string;
  personnelNumber: string;
  disabilityGroup: number;
  mobilePhone: string;
  position: string;
}
