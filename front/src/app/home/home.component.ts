import { Component } from '@angular/core';
import { Pin } from '../models/Pin';
import { PinsService } from '../pins-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pins : Pin[];

  constructor(private pinsService: PinsService){
    this.pins = pinsService.getPins();
  }

  onPinHover(pin: Pin){
    console.log(pin.id)
  }

  onPinLeave(pin: Pin){
    // Handle pin leave event
  }
}
