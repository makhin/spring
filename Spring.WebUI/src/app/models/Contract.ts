import {IEntity} from './IEntity';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class Contract implements IEntity {
  id: number;
  name: string;
  code: string;
  description: string;
  beginDate: NgbDateStruct;
  endDate: NgbDateStruct;
  isActive: boolean;
}
