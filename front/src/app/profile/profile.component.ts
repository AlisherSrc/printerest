import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { MediaService } from '../media.service';
import { User } from '../models/User';
import { UserProfile } from '../models/UserProfile';
import { lastValueFrom } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Pin } from '../models/Pin';
import { PinsService } from '../pins-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userAvatar !: SafeUrl;
  userName: string = "cool user";
  usersPins : Pin[] = [];

  currUser !: UserProfile;


  constructor(private userService: UserService,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer,
    private pinService: PinsService) {

    this.userService.curr_user.subscribe(async (user) => {
      console.log("Current profile user: " + user)

      if (user && user.user && user.user.username) {
        // getting a current user
        this.currUser = user;
        this.userName = user.user.username

        let userAvatarPath;
        // correcting a path
        if (user.avatar) {
          userAvatarPath = this.mediaService.getPath(user.avatar);
        }

        if (this.currUser.avatar && userAvatarPath) {

          // getting an avatar path from the backend side
          userAvatarPath = await lastValueFrom(this.mediaService.getMedia(userAvatarPath));
          //  making this url safe
          this.userAvatar = this.sanitizer.bypassSecurityTrustUrl(userAvatarPath);
        }

        // getting pins of this user
        let curr_pins = await lastValueFrom(this.pinService.getPinsByUser(this.userName))

        if(curr_pins){
          this.usersPins = curr_pins;
        }

      }
    })


  }
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  const curr_username = localStorage.getItem("username");
  if(curr_username){
    this.userName = curr_username;
  }
}


  activeSection = 'created'; // set the default active section to 'created'

  showSection(section: string) {
    this.activeSection = section;
  }

}
