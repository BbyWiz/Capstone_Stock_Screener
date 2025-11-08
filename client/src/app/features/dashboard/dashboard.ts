// src/app/features/dashboard/dashboard.component.ts
import { Component, Inject, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TickerInputComponent } from '../ticker-input/ticker-input';
import { StockService } from '../../core/stock';
import type { ScreenResult } from '../../core/models/stock-dto';
import { SignalBadgeComponent } from '../signal-badge/signal-badge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TickerInputComponent, SignalBadgeComponent],
  template: `
    <app-ticker-input (submitTicker)="onSubmit($event)"></app-ticker-input>

    @if (loading()) {
      <p>loading...</p>
    }
    @if (error()) {
      <p>{{error.toString()}}</p>
    }
    @if (result()) {
      @for (r of [result()]; track r!.symbol) {
        <section class="card">
          <h3>{{ r!.symbol }} · {{ r!.company }}</h3>
          <app-signal-badge [signal]="r!.signal"></app-signal-badge>
          <p>Score: {{ r!.score }}</p>
          <pre>{{ r!.explanation }}</pre>
        </section>
      }
    }
  `,
})
export class DashboardComponent {
  result = signal<ScreenResult | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  private stock = inject(StockService);

  constructor() {}

  async onSubmit(symbol: string) {
    this.loading.set(true);
    this.error.set(null);
    this.result.set(null);
    try {
      this.result.set(await this.stock.screen(symbol));
    } catch (e: any) {
      this.error.set(e?.message ?? 'Request failed');
    } finally {
      this.loading.set(false);
    }
  }
}
