import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Charts } from './charts';

describe('Charts', () => {
  let component: Charts;
  let fixture: ComponentFixture<Charts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Charts],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Charts);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
