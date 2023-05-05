import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PinsService } from '../pins-service.service';
import { Pin } from '../models/Pin';
import { last, lastValueFrom } from 'rxjs';
import { UserProfile } from '../models/UserProfile';
import { UserService } from '../user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-pin-page',
  templateUrl: './pin-page.component.html',
  styleUrls: ['./pin-page.component.css']
})
export class PinPageComponent {
  currPin: Pin | null = null;
  pinUser: UserProfile | null = null;
  pinUserAvatar: SafeUrl | null = null;
  pinImage: SafeUrl | null = null;

  constructor(private route: ActivatedRoute,
    private pinService: PinsService,
    private userService: UserService,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer) {

  }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const pinId = this.route.snapshot.paramMap.get("pinId")

    if (pinId) {
      const currPinTemp = await lastValueFrom(this.pinService.getPin(parseInt(pinId)))
      if (currPinTemp) {
        this.currPin = currPinTemp;
      }
    } else {
      console.warn("Pin with associated ID is not found")
    }

    // console.log(this.currPin?.user) works
    const pinUserUsername = this.currPin?.user.username;

    if (pinUserUsername) {
      const pinUserTemp = await lastValueFrom(this.userService.getUser(pinUserUsername));

      if (pinUserTemp) this.pinUser = pinUserTemp;
      else console.warn("Something went wrong while getting user on the pin page component")
    }
    // getting avatar for user
    if (this.pinUser && this.pinUser.avatar) {
      const path = this.mediaService.getPath(this.pinUser.avatar);
      console.log("Path: " + path);

      // image from backend
      this.mediaService.getMedia(path).subscribe((path) => {
        const safePathTemp = this.sanitizer.bypassSecurityTrustUrl(path)

        this.pinUserAvatar = safePathTemp
      })
    }


    if (this.currPin?.content && this.currPin?.contentUrl) {
      const pinContent = await lastValueFrom(
        this.mediaService.getMedia('media/pins/' + this.currPin.contentUrl)
      );
      if (pinContent) {
        this.pinImage = this.sanitizer.bypassSecurityTrustUrl(pinContent);
        console.log(pinContent);
      }
    }

  }


}
