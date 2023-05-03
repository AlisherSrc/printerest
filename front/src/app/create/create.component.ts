import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    const currUserTemp = await lastValueFrom(this.userService.curr_user);
    if (currUserTemp) this.curr_user = currUserTemp;

  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }


  onFileSelected(event: Event) {
    this.isPhotoUploaded = true;

    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif")) {
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

  saveData() {

    let data: Pin | null = null;
    const currentTime = new Date();

    if (this.curr_user && this.curr_user.user) {
      let tagsNames : string[] = [];
      let tags : Tag[] = [];

      // get tags names by spliting it with ','
      tagsNames = this.tags.split(",");

      tagsNames.map((tagName) => {
        tags.push({name:tagName});
      })

      data = {
        title: this.textLine,
        description: this.photoDescription,
        contentUrl: this.photoPreview,
        timeUploaded: currentTime,
        destinationLink: this.photoUrl,
        tags: tags,
        user: this.curr_user.user
      };
    }

    if (data) this.pinService.postPin(data);



  }
}
