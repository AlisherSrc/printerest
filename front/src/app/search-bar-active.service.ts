import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarActiveService {
  private searchBarActive = new BehaviorSubject<boolean>(false);
  public searchBarActive$ = this.searchBarActive.asObservable();

  constructor() {}

  setSearchBarActive(active: boolean) {
    this.searchBarActive.next(active);
  }

  getSearchBarActive() {
    return this.searchBarActive.getValue();
  }
}
