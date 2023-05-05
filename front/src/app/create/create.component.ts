import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, timestamp } from 'rxjs';
import { UserService } from '../user.service';
import { UserProfile } from '../models/UserProfile';
import { Pin } from '../models/Pin';
import { Tag } from '../models/Tag';
import { PinsService } from '../pins-service.service';
import { ActivatedRoute } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  curr_user: UserProfile | null = null;
  textLine: string = '';
  photoDescription: string = '';
  photoPreview: string | SafeUrl = '';
  selectedImage: File | null = null;
  isPhotoUploaded: boolean = false;
  photoUrl: string | SafeUrl = '';
  tags: string = '';

  editMode: boolean = false;
  currPinId: number | null = null;
  pinTagsStr: string | null = null;


  submitted:boolean = false;
  // Errors
  photoUrlError: boolean = false;
  photoError: boolean = false;

  tagsError: boolean = false;
  photoNotUploadedError: boolean = false;

  currPin: Pin | null = null;

  constructor(private http: HttpClient,
    private userService: UserService,
    private pinService: PinsService,
    private route: ActivatedRoute) {

    //using url, find out whether it will edit or delete existing pin or build a new one
    this.editModeVerify();
  }


  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.curr_user.subscribe((user) => {
      const currUserTemp = user;
      if (currUserTemp) this.curr_user = currUserTemp;
    })
    // if edit mode is enabled
    if (this.currPinId && this.editMode) {
      const currPinTemp = await lastValueFrom(this.pinService.getPin(this.currPinId));

      if (currPinTemp) {
        this.currPin = currPinTemp;
      }
      if (this.currPin?.tags) {
        this.pinTagsStr = this.currPin.tags.map(tag => tag.name).join(', ');
      }

      // giving default values of Pin

      this.textLine = this.currPin?.title ?? this.textLine;
      this.photoDescription = this.currPin?.description ?? this.photoDescription;
      this.tags = this.pinTagsStr ?? this.tags;
      this.photoUrl = this.currPin?.destinationLink ?? this.photoUrl;
      this.photoPreview = this.currPin?.contentUrl ?? this.photoPreview;
      // this.selectedImage = this.currPin?.content ?? this.selectedImage;

    }
  }

  editModeVerify() {
    const pinId: string | null = this.route.snapshot.paramMap.get("pinId");

    if (pinId) {
      this.editMode = true;
      this.currPinId = parseInt(pinId);
    } else {
      this.editMode = false;
    }

  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }


  onFileSelected(event: Event) {
    this.isPhotoUploaded = true;

    const file = (event.target as HTMLInputElement).files?.[0];

    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif")) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.photoPreview = e.target?.result?.toString() ?? '';
        this.isPhotoUploaded = true;
      };
      reader.readAsDataURL(file);
    } else {
      this.photoPreview = '';
      this.isPhotoUploaded = false;
      const jsonError: JSON = JSON.parse('{"photo":"error"}');
      this.checkErrors(jsonError);
      return;
    }

  }
  public isDragOver = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif")) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.photoPreview = event.target.result;
        this.isPhotoUploaded = true;
      };
      reader.readAsDataURL(file);
    } else {
      this.photoPreview = '';
      this.isPhotoUploaded = false;

      const jsonError: JSON = JSON.parse('{"photo":"error"}');
      this.checkErrors(jsonError);
      return;
    }
  }



  deletePhoto() {
    this.photoPreview = '';
    this.isPhotoUploaded = false;
  }


  saveData() {
    // Clean Errors:
    this.checkErrors(JSON.parse('{"clean":"200"}'))


    const currentTime = new Date();

    if ((this.curr_user && this.curr_user.user && this.selectedImage)) {
      let tagsNames: string[] = [];
      let tags: Tag[] = [];

      // Get tags names by splitting them with ','
      tagsNames = this.tags.split(',');

      tagsNames.map((tagName) => {
        tags.push({ name: tagName });
      });

      const tagsJSON = JSON.stringify(tagsNames);
      const tagsBlob = new Blob([tagsJSON], { type: 'application/json' });


      console.log(currentTime.toISOString())
      const pinData = new FormData();
      pinData.append('title', this.textLine);
      pinData.append('description', this.photoDescription);
      pinData.append('content', this.selectedImage);
      pinData.append('timeUploaded', currentTime.toISOString());
      pinData.append('destinationLink', JSON.stringify(this.photoUrl));
      pinData.append('tags', tagsBlob);
      pinData.append('username', JSON.stringify(this.curr_user.user.username));


      // console.log(pinData);alright
      // if it is not a edit mode, then we do post request and put if otherwise
      if (!this.editMode) {
        this.pinService.postPin(pinData).subscribe({
          next: (pin: Pin) => {
            console.log(pin);
            this.submitted = true;
          },
          error: (e) => {
            console.error(e);
            this.checkErrors(e.error);
            return;
          }
        });
      }
    }else if(!this.selectedImage){
      this.checkErrors(JSON.parse('{"photoNotUploaded":"error"}'));
      return;
    }else{
      console.error("Current user was not found");
    }


  }

  editData() {
    this.checkErrors(JSON.parse('{"clean":"200"}'))

    const pinData = new FormData();
    let tagsNames: string[] = [];
    let tags: Tag[] = [];

    // verify tags input,they should go like: milk,dinner,lamp
    if (!this.isValidTagString(this.tags) && (this.tags)) {
      this.checkErrors(JSON.parse('{"tags":"error"}'));
      return;
    }
    // Get tags names by splitting them with ','
    tagsNames = this.tags.split(',');

    tagsNames.map((tagName) => {
      tags.push({ name: tagName });
    });

    const tagsJSON = JSON.stringify(tagsNames);
    const tagsBlob = new Blob([tagsJSON], { type: 'application/json' });

    // adding edited data
    console.log(this.photoUrl)
    this.textLine && pinData.append("title", this.textLine);
    this.photoDescription && pinData.append("description", this.photoDescription);
    this.selectedImage && pinData.append("content", this.selectedImage);
    this.photoUrl && pinData.append("destinationLink", this.photoUrl.toString());
    tagsBlob && pinData.append("tags", tagsBlob);
    this.curr_user?.user?.username && pinData.append("username", this.curr_user?.user?.username);

    console.log("selected img url: " + this.photoUrl);

    if (this.currPinId) {
      this.pinService.updatePin(pinData, this.currPinId).subscribe({
        next: (v) => {
          this.submitted = true;
        }, error: (e) => {
          // Check for errors
          this.checkErrors(e.error);
          return;
        }
      }
      );
    } else {
      console.warn("Pin Id is not found")
    }
  }

  deleteData() {
    if (this.currPinId) {
      this.pinService.deletePin(this.currPinId).subscribe((response) => {
        console.log(response);
      })
    }
  }

  isValidTagString = (tagsStr: string) => {
    // Split the string by commas
    const tags = tagsStr.split(',');

    // Check each tag
    for (const tag of tags) {
      // Trim leading and trailing whitespace from each tag
      const trimmedTag = tag.trim();

      // Check if the trimmed tag is empty
      if (trimmedTag.length === 0) {
        return false;
      }
    }

    return true;
  }

  // getHeaders(): { headers: HttpHeaders } {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'multipart/form-data',
  //   });
  //   return { headers };
  // }

  checkErrors = (errors: JSON) => {
    if (!errors) {
      this.tagsError = false;
      this.photoError = false;
      this.photoUrlError = false;
      return;
    }

    for (let error in errors) {
      if (errors.hasOwnProperty(error)) {
        if(error === "clean") {
          this.tagsError = false;
          this.photoError = false;
          this.photoUrlError = false;
          this.photoNotUploadedError = false;
          return;
        }
        error === "photoNotUploaded" && (this.photoNotUploadedError = true)
        error === "destinationLink" && (this.photoUrlError = true);
        error === "photo" && (this.photoError = true);
        error === "tags" && (this.tagsError = true);
      }
    }
  }
}
