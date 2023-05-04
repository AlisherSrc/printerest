import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, timestamp } from 'rxjs';
import { UserService } from '../user.service';
import { UserProfile } from '../models/UserProfile';
import { Pin } from '../models/Pin';
import { Tag } from '../models/Tag';
import { PinsService } from '../pins-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  curr_user: UserProfile | null = null;
  textLine: string = '';
  photoDescription: string = '';
  photoPreview: string = '';
  selectedImage: File | null = null;
  isPhotoUploaded: boolean = false;
  photoUrl: string = '';
  tags: string = '';


  constructor(private http: HttpClient,
    private userService: UserService,
    private pinService: PinsService) {

  }


  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // const currUserTemp = await lastValueFrom(this.userService.curr_user);
    this.userService.curr_user.subscribe((user) => {
      const currUserTemp = user;
      if (currUserTemp) this.curr_user = currUserTemp;
    })
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
    }
  }



  deletePhoto() {
    this.photoPreview = '';
    this.isPhotoUploaded = false;
  }




  // saveData() {
  //   const formData = new FormData();
  //   const currentTime = new Date();

  //   if (this.curr_user && this.curr_user.user && this.selectedImage) {
  //     let tagsNames: string[] = [];
  //     let tags: Tag[] = [];

  //     // Get tags names by splitting them with ','
  //     tagsNames = this.tags.split(",");

  //     tagsNames.map((tagName) => {
  //       tags.push({ name: tagName });
  //     });

  //     console.log("content url: " + this.photoPreview);
  //     formData.append('title', this.textLine);
  //     formData.append('description', this.photoDescription);
  //     formData.append('content', this.selectedImage);
  //     formData.append('timeUploaded', currentTime.toISOString());
  //     formData.append('destinationLink', this.photoUrl);
  //     formData.append('tags', JSON.stringify(tags));
  //     formData.append('user', this.curr_user.user);

  //     this.pinService.postPin(formData).subscribe((response) => {
  //       console.log(response);
  //     });
  //   }
  // }

  saveData() {
    const currentTime = new Date();

    if (this.curr_user && this.curr_user.user && this.selectedImage) {
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
      pinData.append('destinationLink', this.photoUrl);
      pinData.append('tags', tagsBlob);
      pinData.append('username', JSON.stringify(this.curr_user.user.username));


      // console.log(pinData);alright
      this.pinService.postPin(pinData).subscribe((response) => {
        console.log(response);
      });
    }
  }

  // getHeaders(): { headers: HttpHeaders } {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'multipart/form-data',
  //   });
  //   return { headers };
  // }
}
