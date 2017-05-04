import {IEntity} from './IEntity';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
export class Contract implements IEntity {
  id: number;
  name: string;
  code: string;
  description: string;
  beginDate: any;
  endDate: any;
  isActive: boolean;
  constructor (id: number, name: string, code: string) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.isActive = false;
  }
}
