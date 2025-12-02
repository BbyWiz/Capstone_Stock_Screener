import { Component } from '@angular/core';
import { Screener } from '../screener/screener';
import { Calendar } from '../calendar/calendar';

@Component({
  selector: 'app-dashboard',
  imports: [Screener, Calendar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
