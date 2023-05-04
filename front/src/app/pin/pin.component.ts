import { Component, Input } from '@angular/core';
import { Pin } from '../models/Pin';
import { MediaService } from '../media.service';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent {
  @Input() pin !: Pin; // can cause "undefined" error

  inAlbum : boolean;

  constructor(private mediaService : MediaService,
    private sanitizer: DomSanitizer){
    this.inAlbum = false;
  }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // If pin has 'content' field then we prioritize it upon passed Url
    if (this.pin.content && this.pin.contentUrl) {
      const pinContent = await lastValueFrom(
        this.mediaService.getMedia('media/pins/' + this.pin.contentUrl)
      );
      const safePinContentUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(pinContent);
      if (pinContent){
        this.pin.contentUrl = this.sanitizer.bypassSecurityTrustUrl(pinContent);
        console.log(pinContent);
      }
    }
  }
}
