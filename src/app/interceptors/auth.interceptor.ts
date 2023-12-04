import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionService} from "../services/auth/session.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private sessionService:SessionService) {}
  intercept(
      request: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.sessionService.getUser();

    if (currentUser && currentUser['access_token']) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      });

      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
