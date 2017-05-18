import { Injectable } from '@angular/core';

@Injectable()
export class Localization {

  calendarRu() {
    let calendar = {
      firstDayOfWeek: 0,
      dayNames: ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресение"],
      dayNamesShort: ["пнд", "втр", "срд", "чтв", "птн", "сбт", "вск"],
      dayNamesMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      monthNames: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
      monthNamesShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
    };
    return calendar;
  }

  dateFormatRu() {
    return "dd.mm.yy";
  }
}
