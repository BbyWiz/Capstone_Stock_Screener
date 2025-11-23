import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Dashboard } from './dashboard';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<Dashboard>;
  let component: Dashboard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Dashboard,  
        FormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call backend if symbol is empty and set error', () => {
    component.symbol = '   ';
    component.runScreen();

    expect(component.error).toBe('Symbol is required');
    expect(component.isLoading).toBe(false);
    expect(component.result).toBeNull();
  });

  it('should start loading and clear error when symbol is provided', () => {
    component.error = 'Some error';
    component.symbol = 'AAPL';

    component.runScreen();

    expect(component.error).toBeNull();
    expect(component.isLoading).toBe(true);
  });
});
