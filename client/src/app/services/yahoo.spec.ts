import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { Yahoo } from './yahoo';

describe('Yahoo service', () => {
  let service: Yahoo;
  let httpMock: HttpTestingController;
  let summary: string = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        Yahoo
      ],
    });
    service = TestBed.inject(Yahoo);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    // Test to ensure the Yahoo service is instantiated correctly
    expect(service).toBeTruthy();
  });

  it('should POST to /api/yahoo/screen with trimmed and uppercased symbol', () => {
    // Test to verify that the service sends a POST request with the correct symbol format
    const mockResponse = { symbol: 'AAPL' };

    service.screen('  aapl  ', 7, 14, summary).subscribe((resp) => {
      expect(resp).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((r) => r.url.endsWith('/api/yahoo/screen'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      symbol: 'AAPL',
      smaWindow: 7,
      rsiPeriod: 14,
      summary: '',
    });

    req.flush(mockResponse);
  });

  it('should allow multiple calls with different symbols', () => {
    // Test to ensure the service can handle multiple requests with different symbols
    const first = service.screen('MSFT', 10, 5, summary).subscribe();
    const second = service.screen('TSLA', 20, 14, summary).subscribe();

    const reqs = httpMock.match((r) => r.url.endsWith('/api/yahoo/screen'));
    expect(reqs.length).toBe(2);
    
    expect(reqs[0].request.body.symbol).toBe('MSFT');
    expect(reqs[0].request.body.smaWindow).toBe(10);
    expect(reqs[0].request.body.rsiPeriod).toBe(5);
    reqs[0].flush({ symbol: 'MSFT' });

    expect(reqs[1].request.body.symbol).toBe('TSLA');
    expect(reqs[1].request.body.smaWindow).toBe(20);
    expect(reqs[1].request.body.rsiPeriod).toBe(14);
    reqs[1].flush({ symbol: 'TSLA' });

    first.unsubscribe();
    second.unsubscribe();
  });
});
