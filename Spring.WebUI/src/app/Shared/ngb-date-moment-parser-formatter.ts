import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

export class NgbDateMomentParserFormatter extends NgbDateParserFormatter {

  constructor(private momentFormat: string) {
    super();
  };

  format(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }

    let d = moment({ year: date.year,
      month: date.month - 1,
      date: date.day });

    if (!d.isValid())
      return '';

    if (this.momentFormat != null) {
      return d.format(this.momentFormat);
    }
    else{
      return d.format();
    }

  }

  parse(value: string): NgbDateStruct {
    if (!value) {
      return null;
    }

    let d:moment.Moment;
    if (this.momentFormat != null) {
      d = moment(value);
    } else {
      d = moment(value, this.momentFormat);
    }

    return d.isValid() ? { year: d.year(),
      month: d.month() + 1,
      day: d.date() } : null;

  }
}
