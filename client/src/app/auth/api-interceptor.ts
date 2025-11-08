// src/app/core/http/api-base-url.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('http')) {
    const url = `${environment.apiBaseUrl}${req.url}`;
    req = req.clone({ url });
  }
  return next(req);
};
