import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { async } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn : boolean;


  constructor(private authService : AuthService,
    private userService: UserService){
    this.isLoggedIn = false;

    authService.isLoggedIn().subscribe((logged) => {
      this.isLoggedIn = logged;
    })

    this.login();

  }


  // login() {
  //   // async
  //   this.authService.isLoggedIn().subscribe((logged) => {
  //     // not async
  //     const username = localStorage.getItem('username');
  //     // async
  //     if (username){
  //       this.userService.setCurrentUsername(username);
  //     }
  //     this.isLoggedIn = logged;
  //     console.log("Hey " + this.isLoggedIn + " " + localStorage.getItem('username'))
  //   })

  async login() {
    // const logged = await lastValueFrom(this.authService.isLoggedIn());
    const username = localStorage.getItem('username');

    if (username) {
      await this.userService.setCurrentUsername(username);
    }

    // if(logged) this.isLoggedIn = logged;
    console.log("Hey " + this.isLoggedIn + " " + localStorage.getItem('username'));
  }

    // const logged = await this.authService.isLoggedIn().toPromise();

    // const username = localStorage.getItem('username');

    // if (username){
    //   await this.userService.setCurrentUsername(username);
    // }

    // if(logged) this.isLoggedIn = logged;

    // console.log("Hey " + this.isLoggedIn + " " + localStorage.getItem('username'))

  }





