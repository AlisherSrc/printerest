import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timestamp } from 'rxjs';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

onSubmit() {
throw new Error('Method not implemented.');
}
  textLine: string = '';
  photoDescription: string = '';
  photoPreview: string = '';
  isPhotoUploaded: boolean = false;
  photoUrl: string = '';
  tags: string = ' ';

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" ||  file.type === "image/gif")) {
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
  if (file && (file.type === "image/jpeg" || file.type === "image/png" ||  file.type === "image/gif")) {
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

  constructor(private http: HttpClient) { }

  saveData() {
    const currentTime = new Date().toISOString();
    const data = {
      title: this.textLine,
      description: this.photoDescription,
      contentUrl: this.photoPreview,
      timeUploaded: currentTime,
      destinationLink: this.photoUrl,
      tags: this.tags,
      
    };

    this.http.post('http://localhost:8000/api/create_pin/', data)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
}}
