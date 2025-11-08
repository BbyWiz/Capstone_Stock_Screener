// client/src/app/shared/signal-badge.component.ts
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signal-badge',
  standalone: true,
  imports: [NgClass],
  template: `<span class="badge" [ngClass]="signal">{{ signal }}</span>`,
  styles: [
    `
      .badge {
        padding: 0.2rem 0.5rem;
        border-radius: 0.5rem;
        text-transform: uppercase;
        font-size: 0.75rem;
      }
      .buy {
        background: #e6ffe6;
        color: #0a7a0a;
      }
      .hold {
        background: #fffbe6;
        color: #8a6d00;
      }
      .sell {
        background: #ffe6e6;
        color: #a10e0e;
      }
    `,
  ],
})
export class SignalBadgeComponent {
  @Input({ required: true }) signal!: 'buy' | 'hold' | 'sell';
}
