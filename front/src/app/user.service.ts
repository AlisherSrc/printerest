import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, lastValueFrom } from 'rxjs';
import { UserProfile } from './models/UserProfile';
import { User } from './models/User';
import { BASE_URL } from './globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  curr_username = new BehaviorSubject<string>("default username");
  curr_user = new BehaviorSubject<UserProfile | undefined>(undefined);

  // for PUT,POST request to specify that we request in JSON format
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  constructor(private http: HttpClient) {

  }

  getUser(username:string):Observable<UserProfile>{
    return this.http.get<UserProfile>(
      `${BASE_URL}/api/users/${username}/`
    )
  }

  async setCurrentUsername(username: string) {
    this.curr_username.next(username);
    const user = await lastValueFrom(this.getUser(username));
    this.curr_user.next(user);
  }

  updateUser(username: string, user: UserProfile): Observable<UserProfile|Object> {
    const url = `${BASE_URL}/api/users/${username}/`;
    return this.http.put(url, user, this.httpOptions).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }

  postUser(user: UserProfile): Observable<UserProfile>{
    return this.http.post(`${BASE_URL}/api/users/`,user).pipe(
      catchError((error:any) => {
        throw error;
      })
    )
  }

  deleteUser(username:string){
    console.warn("deleting user...")
    return this.http.delete(
      `${BASE_URL}/api/users/${username}/`
    ).pipe(
      catchError((error:any) => {
        throw error;
      })
    )
  }
}
