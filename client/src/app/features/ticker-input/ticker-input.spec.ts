import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerInputComponent } from './ticker-input';

describe('TickerInput', () => {
  let component: TickerInputComponent;
  let fixture: ComponentFixture<TickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickerInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
