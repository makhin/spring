import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";
import {Injectable} from "@angular/core";

@Injectable()
export class SpringNgbDateParserFormatter extends NgbDateParserFormatter {
  datePipe = new DatePipe('en-US');
  dateFormatString: string = "dd.MM.yyyy";

  format(date: NgbDate): string {
    if (date === null) {
      return '';
    }
    try {
      return this.datePipe.transform(new Date(date.year, date.month - 1, date.day), this.dateFormatString);
    } catch (e) {
      return '';
    }
  }

  parse(value: string): NgbDate {
    let returnVal: NgbDate;
    return returnVal;
  }
}
