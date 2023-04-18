import { Injectable } from '@angular/core';
import { AuthToken } from './models/Auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // In order to be notified when setLoggedIn() method is called
  private loggedin = new BehaviorSubject<boolean>(false);
  BASE_URL: string = 'http://127.0.0.1:8000';


  constructor(private http : HttpClient) {

  }

  isLoggedIn() : Observable<boolean>{
    return this.loggedin.asObservable();
  }

  setLoggedIn(val : boolean){
    this.loggedin.next(val);
  }

  login(username: string, password: string) : Observable<AuthToken> {
    return this.http.post<AuthToken>(
      `${this.BASE_URL}/api/login/`,
      {
        username,password
      }
    )
  }

}
