import { Component } from '@angular/core';
import { Album } from '../models/Album';
import { UserProfile } from '../models/UserProfile';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { AlbumService } from '../album.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PinsService } from '../pins-service.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent {
  loaded: boolean;

  album : Album|null = null;


  curr_user : UserProfile|null = null;

  constructor(private userService : UserService,
    private albumService : AlbumService,
    private pinService: PinsService,
    private route: ActivatedRoute
    ){
      this.loaded = true;
  }
  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    await this.initialize();
  }


  async initialize(): Promise<void>{
    this.userService.curr_user.subscribe((user) => {
      let currUser = user;
      if(currUser){
        this.curr_user = currUser;
      }
    })

    const params = this.route.snapshot.paramMap;
    const albumName = params.get("album");
    const username = params.get("username");

    if(albumName === 'created' && username){
      const pins = await lastValueFrom(this.pinService.getPinsByUser(username));
      this.album = {
        name:"Created Pins",
        pins:pins,
        user:this.curr_user?.user?.id
      }
    }
    else if(username && albumName){
      this.album = await lastValueFrom(this.albumService.getAlbumByName(username,albumName));
    }
    else console.warn("Album name nor username were found")

  }

}
