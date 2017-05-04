import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

export class NgbDateConverter {

  constructor() {}

  public static format(date: NgbDateStruct, momentFormat: string = null): string {
    if (date === null) {
      return '';
    }

    let d = moment({ year: date.year,
      month: date.month - 1,
      date: date.day });

    if (!d.isValid())
      return '';

    if (momentFormat != null) {
      return d.format(momentFormat);
    }
    else{
      return d.format();
    }
  }

  public static parse(value: string, momentFormat: string = null): NgbDateStruct {
    if (!value) {
      return null;
    }

    let d:moment.Moment;
    if (momentFormat != null) {
      d = moment(value);
    } else {
      d = moment(value, momentFormat);
    }

    return d.isValid() ? { year: d.year(),
      month: d.month() + 1,
      day: d.date() } : null;
  }
}
