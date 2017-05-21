import { IEntity } from './IEntity'
export class MedicalInsuranceCase implements IEntity {
  id: number;
  customerId: number;
  mkb10: string;
  hospital: string;
  therapy: string;
  treatment: string;
}
