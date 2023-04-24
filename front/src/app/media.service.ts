import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './globals';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {


  constructor(private http:HttpClient) {
  }

  getAvatar(path:string):Observable<string>{
    return this.http.get(`${BASE_URL}api/media/${path}`,{responseType:'blob'})
    // .pipe(map(res => URL.createObjectURL(res)))
  }

  getPath(wholePath:string){
    let splitedPath : string[]  = wholePath.split('/');
    let splitedRightPath : string[] = splitedPath.slice(3);
    return splitedRightPath.join('/');
  }
}
