import { Component, Input } from '@angular/core';
import { Pin } from '../models/Pin';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent {
  @Input() pin !: Pin; // can cause "undefined" error

  inAlbum : boolean;

  constructor(){
    this.inAlbum = false;
  }
}
