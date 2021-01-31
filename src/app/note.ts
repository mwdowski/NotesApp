import { DatePipe, formatDate } from '@angular/common';

export class Note {

  id: number;
  title: string;
  text: string;
  date: string;

  constructor(id: number, title: string, text: string, date?: string) {
    this.id = id;
    this.title = title;
    this.text = text;
    if (date !== undefined) {
      this.date = date;
    }
    else {
      this.date = formatDate(Date.now(), 'YYYY-MM-dd HH:mm:ss', 'en-US');
    }
  }

}
