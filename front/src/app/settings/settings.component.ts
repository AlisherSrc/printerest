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
  emailAlreadyRegError: boolean;

  usernameAlreadyRegError: boolean;
  unexpectedError: boolean;


  isSubmited: boolean;

  constructor(private userService: UserService,
    private auth: AuthService) {

    this.username = localStorage.getItem("username") ?? ""

    this.email = "";
    this.emailError = false;
    this.isSubmited = false;
    this.emailAlreadyRegError = false;
    this.usernameAlreadyRegError = false;
    this.unexpectedError = false;

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

    let inputUser: UserProfile | null = null; // Initialize the variable with a default value


    if (this.user.user && this.user.user.username) {

      if (this.username === "") {
        // If this email is already in our database then we show an error
        if (this.email === this.user.email) {
          this.emailAlreadyRegError = true;
          return;
        } else {
          this.emailAlreadyRegError = false;
        }

        inputUser = {
          user: {},
          email: this.email
        };
      } else if (this.email === "") {
        // Same verification as above but this time this is for username
        if (this.username === this.user.user.username) {
          this.usernameAlreadyRegError = true;
          return;
        } else {
          this.usernameAlreadyRegError = false;
        }

        inputUser = {
          user: {
            username: this.username
          }
        }

      } else if (this.username !== "" && this.email !== "") {
        // Same verification as above but this time this is for both of them
        if (this.username === this.user.user.username) {
          this.usernameAlreadyRegError = true;
          return;
        } else {
          this.usernameAlreadyRegError = false;
        }

        if (this.email === this.user.email) {
          this.emailAlreadyRegError = true;
          return;
        } else {
          this.emailAlreadyRegError = false;
        }

        inputUser = {
          user: {
            username: this.username
          },
          email: this.email
        };
      } else {
        inputUser = {}
        console.error("Unexpected error while creating an input user in onSubmit")
        return;
      }
      const username = localStorage.getItem("username");

      if (username) {
        this.userService.updateUser(username, inputUser).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error)
          }
        );
      }
      // console.log("Hello!")
    }

    // After user changes his username we should update it in local storage as well as token for it, because we login and
    // retrieve user using username
    const password = localStorage.getItem('password');
    let data;
    if (password && this.username != "") {
      data = await lastValueFrom(this.auth.login(this.username, password));


      localStorage.setItem('token', data.token);
      localStorage.setItem('username', this.username);
      await this.userService.setCurrentUsername(this.username);

    }

    this.isSubmited = true;
    console.log(inputUser, this.username);
  }

  async deleteUser(){
    const resp = await lastValueFrom(this.userService.deleteUser(this.username));
    this.isSubmited = true;
    console.log(resp)
    localStorage.clear();
    this.auth.setLoggedIn(false);
  }

}
