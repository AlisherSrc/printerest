import { Injectable } from '@angular/core';
import { Pin } from './models/Pin';
import { pins } from './data/pins';
@Injectable({
  providedIn: 'root'
})
export class PinsServiceService {
  pins: Pin[];

  constructor() {
    this.pins = pins;
  }

}
