import { ChangeDetectorRef, Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { UserProfile } from '../models/UserProfile';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { MediaService } from '../media.service';
import { Observable, lastValueFrom } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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

  userAvatar !: SafeUrl;
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
    private cdr: ChangeDetectorRef,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer
  ) {
    this.search_bar_focus = false;
    this.createMenuDropped = false;
    this.notificationsDropped = false;
    this.messagesDropped = false;
    this.menuDropped = false;

    // subscribes
    this.auth.isLoggedIn().subscribe((logged) => {
      this.loggedIn = logged;
    });

    this.userService.curr_user.subscribe(async (user) => {
      if(user){
        this.currUser = user;
        let avatarPath;
        if(this.currUser.avatar){
          avatarPath = mediaService.getPath(this.currUser.avatar)
        }
        // this.mediaService.getAvatar(avatarPath).subscribe((avatar) => {
        //   this.userAvatar = avatar;
        //   console.log(this.userAvatar)
        // });
        // It will wait until the end of this promise so it will return not Promise but a string
        if(this.currUser.avatar && avatarPath){

        avatarPath = await lastValueFrom(this.mediaService.getMedia(avatarPath))

        this.userAvatar = this.sanitizer.bypassSecurityTrustUrl(avatarPath);
        }
        this.cdr.detectChanges();
        // console.log(avatarPath,this.userAvatar)
      }
    });

    //=============================================

    this.loggedIn = false;

  }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

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
