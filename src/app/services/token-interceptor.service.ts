import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    console.log(req.url);
    if (req.url.includes('/image/upload')) {
      console.log('loading image without header', req.headers);
      if (!req.headers.has('Content-Type')) {
        console.log('content type');
        req = req.clone({
          headers: req.headers.delete('Content-Type', 'application/json')
        });
        console.log('after content', req.headers);
      }
      return next.handle(req);
    }
    if (req.url.includes('.amazonaws')) {
      if (!req.headers.has('Content-Type')) {
        console.log('content type');
        req = req.clone({
          headers: req.headers.delete('Content-Type', 'application/json')
        });
      }
      return next.handle(req);
    }
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `${authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
