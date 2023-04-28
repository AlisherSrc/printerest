import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models/User';
import { lastValueFrom } from 'rxjs';
import { UserProfile } from '../models/UserProfile';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  username: string;
  email: string;
  user !: UserProfile;

  emailError: boolean;

  isSubmited: boolean;

  constructor(private userService: UserService,
    private auth: AuthService) {
    this.username = "";
    this.email = "";
    this.emailError = false;
    this.isSubmited = false;

    this.userService.curr_user.subscribe((user) => {
      const currentUser = user;
      if (currentUser) {
        this.user = currentUser;
      } else {
        console.warn("No current user!")
      }
    })
    // this.getCurrUser();
  }

  // async getCurrUser() {
  //   const currentUser = await lastValueFrom(this.userService.curr_user)
  //   if (currentUser) {
  //     this.user = currentUser;
  //   }
  // }


  async onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    const isEmailValid = emailRegex.test(this.email);

    if (!isEmailValid && this.email !== "") {
      // Email is not valid, handle the error or display a message
      console.warn('Invalid email');
      this.emailError = true;
      return;
    } else {
      this.emailError = false;
    }

    const inputUser: UserProfile = {
      user: {
        username: this.username ? this.username : this.user.user.username
      },
      email: this.email ? this.email : this.user.email,
    };

    this.userService.updateUser(this.user.user.username, inputUser).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error)
      }
    );


    // After user changes his username we should update it in local storage as well as token for it, because we login and
    // retrieve user using username
    const password = localStorage.getItem('password');
    let data;
    if (password) {
      data = await lastValueFrom(this.auth.login(this.username, password));


      localStorage.setItem('token', data.token);
      localStorage.setItem('username', this.username);
      await this.userService.setCurrentUsername(this.username);

      this.isSubmited = true;

    }


    console.log(data, this.username);
  }



}
