import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule,CalendarModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
  encapsulation: ViewEncapsulation.None,
})
export class Calendar {
  readonly today = new Date();
}
