import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { MediaService } from '../media.service';
import { User } from '../models/User';
import { UserProfile } from '../models/UserProfile';
import { lastValueFrom } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userAvatar !: SafeUrl;
  userName: string = "Cool user";

  currUser !: UserProfile;

  constructor(private userService: UserService,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer) {

    this.userService.curr_user.subscribe(async (user) => {
      if (user) {
        // getting a current user
        this.currUser = user;
        console.log(user)
        this.userName = user.user.username

        let userAvatarPath;
        // correcting a path
        if (user.avatar) {
          userAvatarPath = this.mediaService.getPath(user.avatar);
        }

        if (this.currUser.avatar && userAvatarPath) {

          // getting an avatar path from the backend side
          userAvatarPath = await lastValueFrom(this.mediaService.getAvatar(userAvatarPath));
          //  making this url safe
          this.userAvatar = this.sanitizer.bypassSecurityTrustUrl(userAvatarPath);
        }
      }
    })


  }



  activeSection = 'created'; // set the default active section to 'created'

  showSection(section: string) {
    this.activeSection = section;
  }

}
