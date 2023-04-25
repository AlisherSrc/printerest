import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './globals';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class MediaService {


  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {
  }

  getAvatar(path: string): Observable<string> {
    // console.log(`${BASE_URL}api/media/${path}`)
    return this.http.get(`${BASE_URL}/api/media/${path}`, { responseType: 'blob' })
      .pipe(map(res => {
        // console.log(res);
        return URL.createObjectURL(res);
      }), catchError((error, caugth) => {
        console.error(`Error loading avatar image: ${error}`);
        return of("error");
      })
      )
  }

  getPath(wholePath: string) {
    let splitedPath: string[] = wholePath.split('/');
    let splitedRightPath: string[] = splitedPath.slice(3);
    return splitedRightPath.join('/');
  }
}
