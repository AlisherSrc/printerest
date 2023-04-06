import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  search_bar_focus: boolean;
  createMenuDropped: boolean;
  @ViewChild('searchActiveBox') searchActiveBox !: ElementRef;
  @ViewChild('search_bar_box') searchBarBox !: ElementRef;
  @ViewChild('navbarCreatemenu') navbarCreatemanu !: ElementRef;
  @ViewChild('createMenuBtn') createMenuBtn !: ElementRef;

  constructor() {
    this.search_bar_focus = false;
    this.createMenuDropped = false;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


    document.addEventListener('click', this.onDocumentClick.bind(this))
  }

  onDocumentClick(event: MouseEvent) {
    if (this.search_bar_focus) {
      if (!this.searchActiveBox.nativeElement.contains(event.target)
        && !this.searchBarBox.nativeElement.contains(event.target)
      ) {
        this.search_unfocus();
      }
    }

    if(this.createMenuDropped){
      if(!this.navbarCreatemanu.nativeElement.contains(event.target)
      && !this.createMenuBtn.nativeElement.contains(event.target)
      ){
        this.toggleCreateMenu();
        // console.log("noo")

      }
    }
  }


  search_focus() {
    this.search_bar_focus = true;

  }

  search_unfocus() {
    this.search_bar_focus = false;

  }

  toggleCreateMenu = () => {
    this.createMenuDropped = !this.createMenuDropped;
  }

}
