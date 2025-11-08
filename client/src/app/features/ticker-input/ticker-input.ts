// src/app/features/ticker-input/ticker-input.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticker-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="emit()">
      <label for="symbol">Ticker</label>
      <input id="symbol" formControlName="symbol" placeholder="AAPL, DIS, NVDA" />
      <button type="submit" [disabled]="form.invalid">Screen</button>
      @if (form.controls.symbol.invalid && form.controls.symbol.touched) {
        <small> Use letters only, up to five characters. </small>
      }
    </form>
  `,
})
export class TickerInputComponent {
  @Output() submitTicker = new EventEmitter<string>();

  form = new FormGroup({
    symbol: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Za-z]{1,5}$/)],
    }),
  });

  emit() {
    const raw = this.form.controls.symbol.value.trim().toUpperCase();
    if (this.form.valid) this.submitTicker.emit(raw);
  }
}
