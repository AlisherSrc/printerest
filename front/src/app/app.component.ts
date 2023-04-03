import { Component } from '@angular/core';
import { SearchBarActiveService } from './search-bar-active.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isSearchActive ?: boolean;

  constructor(private sba : SearchBarActiveService){
    this.sba.searchBarActive$.subscribe((value : boolean) => {
      this.isSearchActive = value;
    })

  }





}
