import { Injectable } from '@angular/core';
import { Pin } from './models/Pin';
import { pins } from './data/pins';
@Injectable({
  providedIn: 'root'
})
export class PinsService {
  pins: Pin[];

  constructor() {
    this.pins = pins;
  }

  getPins = () : Pin[] => {
    return pins;
  }

  addPin = (pin : Pin) => {
    pins.push(pin)
  }

  deletePin = (pinId : number) => {
    const newPins = pins.filter((pin) => pin.id != pinId)
    this.pins = newPins;
  }

}
