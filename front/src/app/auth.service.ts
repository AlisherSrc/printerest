import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedin: boolean;

  constructor() {
    this.loggedin = false;
  }

  isLoggedIn(){
    return this.loggedin;
  }
}
