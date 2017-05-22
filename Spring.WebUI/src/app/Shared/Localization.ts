import { Injectable } from '@angular/core';

@Injectable()
export class Localization {

  static calendarRu() {
    return {
      firstDayOfWeek: 0,
      dayNames: ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресение"],
      dayNamesShort: ["пнд", "втр", "срд", "чтв", "птн", "сбт", "вск"],
      dayNamesMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      monthNames: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
      monthNamesShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
    };
  }

  static dateFormatRu() {
    return "dd.mm.yy";
  }

  static reviver(key, value): any {

    const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    if (typeof value === "string" && datePattern.test(value)) {
      return new Date(value);
    }

    return value;
  }

  static replacer(key, value): any {
    if (typeof(value) === 'object') {
      for (let k in value) {
        if (value[k] != null && value[k] instanceof Date) {
          let d = value[k];
          value[k] = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString();
        }
      }
    }
    return value;
  }

}
