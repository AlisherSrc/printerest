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
  pins!: Pin[];
  page: number;
  loaded: boolean;
  isSearchActive?: boolean;

  constructor(private pinsService: PinsService) {

    pinsService.getPins().subscribe((data) => {
      this.loaded = true;
      this.pins = data;
    })


    this.page = 1;
    this.loaded = false;

  }

  onPinHover(pin: Pin) {
    console.log(pin.id)
  }

  onPinLeave(pin: Pin) {
    // Handle pin leave event
  }

  onScroll() {

  }
}
