import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenSubject } from './localState';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    tokenSubject.subscribe(t=>{
      request=request.clone({
        headers:request.headers.set("Authorization",`Bearer ${t}`)
      });
    })
    return next.handle(request);
  }
}
