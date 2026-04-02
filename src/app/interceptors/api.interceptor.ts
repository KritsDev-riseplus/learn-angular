import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Add API URL prefix to all requests
    const apiRequest = request.clone({
      url: `${environment.apiUrl}${request.url}`,
      withCredentials: true
    });

    return next.handle(apiRequest);
  }
}
