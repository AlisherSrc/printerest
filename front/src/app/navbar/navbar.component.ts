import { Component } from '@angular/core';
import { SearchBarActiveService } from '../search-bar-active.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  search_bar_focus ?: boolean;
  createMenuDropped : boolean;

  constructor(private sba: SearchBarActiveService) {
    this.sba.searchBarActive$.subscribe((active : boolean) => {
      this.search_bar_focus = active;
    })

    this.createMenuDropped = false;
  }

  search_focus() {
    // this.search_bar_focus = true;
    this.sba.setSearchBarActive(true);
  }

  search_unfocus() {
    // this.search_bar_focus = false;
    this.sba.setSearchBarActive(false);
  }

  toggleCreateMenu = () => {
    this.createMenuDropped = !this.createMenuDropped;
  }

  wrapCreateMenu = () => {
    this.createMenuDropped = false;
  }
}
