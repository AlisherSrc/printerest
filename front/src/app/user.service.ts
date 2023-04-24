import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { UserProfile } from './models/UserProfile';
import { User } from './models/User';
import { BASE_URL } from './globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  curr_username = new BehaviorSubject<string>("default username");
  curr_user = new BehaviorSubject<UserProfile | undefined>(undefined);

  constructor(private http: HttpClient) {

  }

  getUser(username:string):Observable<UserProfile>{
    return this.http.get<UserProfile>(
      `${BASE_URL}/api/users/${username}/`
    )
  }

  // setCurrentUsername(username:string){
  //   this.curr_username.next(username);

  //   this.getUser(username).subscribe((user) => {
  //     this.curr_user.next(user);
  //   })
  // }

  // Depricated
  // async setCurrentUsername(username: string){
  //   this.curr_username.next(username);
  //   const user = await this.getUser(username).toPromise();
  //   this.curr_user.next(user);
  // }


  async setCurrentUsername(username: string) {
    this.curr_username.next(username);
    const user = await lastValueFrom(this.getUser(username));
    this.curr_user.next(user);
  }

}
