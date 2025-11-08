import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalBadge } from './signal-badge';

describe('SignalBadge', () => {
  let component: SignalBadge;
  let fixture: ComponentFixture<SignalBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
