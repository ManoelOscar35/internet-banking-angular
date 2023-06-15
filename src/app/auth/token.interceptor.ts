import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.getLocalStorage('token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next.handle(request);
  }
}
