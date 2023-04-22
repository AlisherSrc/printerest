import { ChangeDetectorRef, Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { UserProfile } from '../models/UserProfile';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  search_bar_focus: boolean;
  createMenuDropped: boolean;
  notificationsDropped: boolean;
  messagesDropped: boolean;
  menuDropped: boolean;
  loggedIn: boolean;

  userAvatar !: string;
  currUser !: UserProfile;

  @ViewChild('searchActiveBox') searchActiveBox !: ElementRef;
  @ViewChild('search_bar_box') searchBarBox !: ElementRef;

  @ViewChild('navbarCreatemenu') navbarCreatemanu !: ElementRef;
  @ViewChild('createMenuBtn') createMenuBtn !: ElementRef;

  @ViewChild('navbarNotifications') navbarNotifications !: ElementRef;
  @ViewChild('notificationIcon') notificationIcon !: ElementRef;

  @ViewChild('menuIcon') menuIcon !: ElementRef;
  @ViewChild('navbarMenu') navbarMenu !: ElementRef;

  @ViewChild('navbarMessages') navbarMessages !: ElementRef;
  @ViewChild('messagesIcon') messagesIcon !: ElementRef;



  constructor(private userService: UserService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.search_bar_focus = false;
    this.createMenuDropped = false;
    this.notificationsDropped = false;
    this.messagesDropped = false;
    this.menuDropped = false;

    this.auth.isLoggedIn().subscribe((logged) => {
      this.loggedIn = logged;
    });

    this.userService.curr_user.subscribe((user) => {
      this.currUser != user;
    });


    this.loggedIn = false;

  }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.username = localStorage.getItem('username');

    // this.userService.getUser(this.username).subscribe((user) => {
    //   this.userAvatar = user.avatar;
    //   this.cdr.detectChanges();
    // });

    // // Listen for changes to the username in localStorage


    document.addEventListener('click', this.onDocumentClick.bind(this))
  }

  ngOnChanges(changes: SimpleChanges): void {


  }

  onDocumentClick(event: MouseEvent) {
    if (this.search_bar_focus) {
      if (!this.searchActiveBox.nativeElement.contains(event.target)
        && !this.searchBarBox.nativeElement.contains(event.target)
      ) {
        this.search_unfocus();
      }
    }

    if (this.createMenuDropped) {
      if (!this.navbarCreatemanu.nativeElement.contains(event.target)
        && !this.createMenuBtn.nativeElement.contains(event.target)
      ) {
        this.toggleCreateMenu();
        // console.log("noo")

      }
    }

    if (this.notificationsDropped) {
      if (!this.navbarNotifications.nativeElement.contains(event.target)
        && !this.notificationIcon.nativeElement.contains(event.target)
      ) {
        this.toggleNotifications();
      }

    }

    if (this.messagesDropped) {
      if (!this.navbarMessages.nativeElement.contains(event.target)
        && !this.messagesIcon.nativeElement.contains(event.target)
      ) {
        this.toggleMessages();
      }
    }

    if (this.menuDropped) {
      if (!this.navbarMenu.nativeElement.contains(event.target)
        && !this.menuIcon.nativeElement.contains(event.target)
      ) {
        this.toggleMenu();
      }
    }
  }


  search_focus() {
    this.search_bar_focus = true;
    console.log(this.currUser.email);
  }

  search_unfocus() {
    this.search_bar_focus = false;

  }

  toggleCreateMenu = () => {
    this.createMenuDropped = !this.createMenuDropped;
  }

  toggleNotifications = () => {
    this.notificationsDropped = !this.notificationsDropped;
  }

  toggleMessages = () => {
    this.messagesDropped = !this.messagesDropped;
  }

  toggleMenu = () => {
    this.menuDropped = !this.menuDropped;
  }
}
