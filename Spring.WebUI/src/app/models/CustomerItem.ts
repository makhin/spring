import { IEntity } from './IEntity'
export class CustomerItem implements IEntity {
  id: number;
  name: string;
  tin: string;
  startDate: string;
  endDate: string;
  totalCount: number;
  totalAmount:number
}
