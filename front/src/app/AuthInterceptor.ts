import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    // if token exists
    if(token){
      // it creates new request from old requst adding new header of auth to it
      const newReq = req.clone({
        headers: req.headers.set('Authorization',`JWT ${token}`),
      })
      return next.handle(newReq);
    }else{
      console.warn("No auth token!");
    }



    return next.handle(req);
  }
}
