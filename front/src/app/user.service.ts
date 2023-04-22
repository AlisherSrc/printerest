import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from './models/UserProfile';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL: string = 'http://127.0.0.1:8000';

  curr_username = new BehaviorSubject<string>("default username");
  curr_user = new BehaviorSubject<UserProfile | undefined>(undefined);

  constructor(private http: HttpClient) {

  }

  getUser(username:string):Observable<UserProfile>{
    return this.http.get<UserProfile>(
      `${this.BASE_URL}/api/${username}/`
    )
  }

  setCurrentUsername(username:string){
    this.curr_username.next(username);

    this.getUser(username).subscribe((user) => {
      this.curr_user.next(user);
    })

  }

}
