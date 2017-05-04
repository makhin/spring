import {IEntity} from './IEntity';

export class Contract implements IEntity {
  id: number;
  name: string;
  code: string;
  description: string;
  beginDate: any;
  endDate: any;
  isActive: boolean;
}
