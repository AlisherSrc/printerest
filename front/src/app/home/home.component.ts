import { Component } from '@angular/core';
import { Pin } from '../models/Pin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pins : Pin[];

  constructor(){
    this.pins = []
  }
}
