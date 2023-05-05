import { Injectable } from '@angular/core';
import { Pin } from './models/Pin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { BASE_URL } from './globals';

@Injectable({
  providedIn: 'root'
})
export class PinsService {
  constructor(private client: HttpClient) {
    // this.pins = pins;
  }

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type':  'application/json',
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    })
  }


  getPin(id: number): Observable<Pin> {
    return this.client.get<Pin>(
      `${BASE_URL}/api/pins/${id}/`
    )
  }


  getPins(): Observable<Pin[]> {
    return this.client.get<Pin[]>(
      `${BASE_URL}/api/pins/`
    )
  }

  getPinsByUser(username: string): Observable<Pin[]> {
    return this.client.get<Pin[]>(
      `${BASE_URL}/api/pins/${username}`
    )
  }


  postPin(pin: FormData): Observable<Pin> {
    return this.client.post<Pin>(
      `${BASE_URL}/api/pins/`,
      pin
    ).pipe(
      catchError((error: any) => {
        throw error;
      })
    )
  }

  updatePin(pin: FormData, pinId: number): Observable<Pin> {
    return this.client.put<Pin>(
      `${BASE_URL}/api/pins/${pinId}/`,
      pin
    ).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }


  deletePin(pinId: number) {
    return this.client.delete(
      `${BASE_URL}/api/pins/${pinId}/`
    ).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }

}
