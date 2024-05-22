import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MixedContentInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('https://')) {
      const insecureReq = req.clone({
        url: req.url.replace(/^https:/, 'http:')
      });

      return next.handle(insecureReq);
    }

    return next.handle(req);
  }
}