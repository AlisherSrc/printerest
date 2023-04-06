import { Component } from '@angular/core';
import { Pin } from '../models/Pin';
import { PinsService } from '../pins-service.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll/public-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pins: Pin[];
  page: number;
  loaded: boolean;
  isSearchActive?: boolean;

  constructor(private pinsService: PinsService,

  ) {
    this.pins = pinsService.getPins().slice(0, 12);
    this.page = 1;
    this.loaded = true;

  }

  onPinHover(pin: Pin) {
    console.log(pin.id)
  }

  onPinLeave(pin: Pin) {
    // Handle pin leave event
  }

  onScroll() {
    this.loaded = false;
    // Simulation of catching data from database
    setTimeout(() => {

      this.pins = this.pins.concat(this.pinsService.getPins().slice(12 * this.page, 12 * this.page + 12))
      this.page++;
      this.loaded = true;
    }, Math.floor(Math.random() * 10000))

  }
}
