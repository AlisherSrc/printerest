import { Injectable } from '@angular/core';
import { Pin } from './models/Pin';
import { pins } from './data/pins';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinsService {
  BASE_URL = "http://127.0.0.1:8000"

  constructor(private client: HttpClient) {
    // this.pins = pins;
  }

  getPin(id: number):Observable<Pin>{
    return this.client.get<Pin>(
      `${this.BASE_URL}/api/pins/${id}/`
    )
  }


  getPins() : Observable<Pin[]>{
    return this.client.get<Pin[]>(
      `${this.BASE_URL}/api/pins/`
    )
  }

  // getPins = () : Pin[] => {
  //   return pins;
  // }

  // addPin = (pin : Pin) => {
  //   pins.push(pin)
  // }

  // deletePin = (pinId : number) => {
  //   const newPins = pins.filter((pin) => pin.id != pinId)
  //   this.pins = newPins;
  // }

}
