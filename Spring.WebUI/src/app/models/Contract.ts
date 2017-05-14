import {IEntity} from './IEntity';

export class Contract implements IEntity {
  id: number;
  name: string;
  code: string;
  description: string;
  beginDate: Date;
  endDate: Date;
  isActive: boolean;
}
