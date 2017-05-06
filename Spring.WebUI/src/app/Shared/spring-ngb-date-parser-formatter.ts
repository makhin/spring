import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {Injectable} from "@angular/core";

@Injectable()
export class SpringNgbDateParserFormatter extends NgbDateParserFormatter {
  datePipe = new DatePipe('en-US');
  dateFormatString: string = "dd.MM.yyyy";

  format(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    try {
      return this.datePipe.transform(new Date(date.year, date.month - 1, date.day), this.dateFormatString);
    } catch (e) {
      return '';
    }
  }

  parse(value: string): NgbDateStruct {
    let returnVal: NgbDateStruct;
    if (!value) {
      returnVal = null;
    } else {
      try {
        let dateParts = value.split(".");
        returnVal = { year: parseInt(dateParts[2]), month: parseInt(dateParts[1]), day: parseInt(dateParts[0]) };
      } catch (e) {
        returnVal = null;
      }
    }
    return returnVal;

  }
}
