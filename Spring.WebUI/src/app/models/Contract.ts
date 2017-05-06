import {IEntity} from './IEntity';
import {NgbDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";

export class Contract implements IEntity {
  id: number;
  name: string;
  code: string;
  description: string;
  beginDate: NgbDate;
  endDate: NgbDate;
  isActive: boolean;
}
