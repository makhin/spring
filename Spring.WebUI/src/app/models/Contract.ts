import {IEntity} from './IEntity';
export class Contract implements IEntity {
  id: number;
  name: string;
  code: string;
  description: string;
  beginDate: Date;
  endDate: Date;
  isActive: boolean;
  constructor (id: number, name: string, code: string) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.isActive = false;
  }
}
