import { Injectable } from '@angular/core';
import { AuthToken } from './models/Auth';
import { Observable, BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from './globals';
import { UserService } from './user.service';
import { User } from './models/User';
import { UserProfile } from './models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // In order to be notified when setLoggedIn() method is called
  private loggedin = new BehaviorSubject<boolean>(false);




  constructor(private http: HttpClient,
    private userService: UserService) {

  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedin.asObservable();
  }

  setLoggedIn(val: boolean) {
    this.loggedin.next(val);

    // If user's profile doesn't exist, then it creates it, if it exists, it will throw an error
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    if (username && email) {
      const user: UserProfile = {
        user: {
          username: username,
          email: email
        },
      }

      const resp = this.userService.postUser(user).subscribe((resp) => {
        console.log("Creating user... " + resp)
      });
    }
  }

  login(username: string, password: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(
      `${BASE_URL}/api/login/`,
      {
        username, password
      }
    )
  }


  register(username: string, email: string, password: string): Observable<any> {
    const userData: User = {
      username,
      email,
      password,
    };
    //   id?:number,
    // user?: User;
    // phone?: string;
    // email?: string;
    // status?: userStatus;
    // // avatar?: string;
    const postResp = this.http.post(`${BASE_URL}/api/register/`, userData);

    return postResp;
  }
}
