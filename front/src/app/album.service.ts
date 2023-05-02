import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom, of } from 'rxjs';
import { Album } from './models/Album';
import { BASE_URL } from './globals';
import { UserService } from './user.service';
import { UserProfile } from './models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  currUserAlbums: Album[] = [];
  currUser: UserProfile | null = null;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initialize();
  }


  initialize(): void {
    this.getAlbums().subscribe((albums) => {

      this.userService.curr_user.subscribe((currUser) => {
        const currUserTemp = currUser;

        if(currUserTemp) this.currUser = currUserTemp;

        this.currUserAlbums = albums.filter((album) => album.user === currUser?.id);
      });

    });
  }

  getAlbumsByUser(username : string): Observable<Album[]>{
    return this.http.get<Album[]>(
      `${BASE_URL}/api/albums/${username}`
    )
  }

  getAlbums():Observable<Album[]>{
    return this.http.get<Album[]>(
      `${BASE_URL}/api/albums/`
    )
  }

  getAlbumByName(username:string,albumName:string):Observable<Album>{
    return this.http.get<Album>(
      `${BASE_URL}/api/albums/${username}/${albumName}`
    ).pipe(
      catchError((error, caught: Observable<Album>) => {

        console.error("Error: " + error)
        return of(error);
      })
    )
    ;
  }
}
