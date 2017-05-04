import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateConverter} from "./ngb-date-converter";

export class NgbDateMomentParserFormatter extends NgbDateParserFormatter {
  constructor(private momentFormat: string) {
    super();
  };

  format(date: NgbDateStruct): string {
    return NgbDateConverter.format(date, this.momentFormat);
  }

  parse(value: string): NgbDateStruct {
    return NgbDateConverter.parse(value, this.momentFormat);
  }
}
