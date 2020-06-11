import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import {  AuthenticationService} from './authentication.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServ: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.authServ.currentUserValue.token;

    if (token != null) {
      authReq = req.clone({ headers: req.headers.set('Authorization',  token) });
    }
    return next.handle(authReq);
  }
}
