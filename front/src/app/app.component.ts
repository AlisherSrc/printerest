import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn : boolean;

  constructor(private authService : AuthService){
    this.isLoggedIn = false;

    authService.isLoggedIn().subscribe((logged) => {
      this.isLoggedIn = logged;
      console.log("Hey" + this.isLoggedIn)
    })
  }






}
