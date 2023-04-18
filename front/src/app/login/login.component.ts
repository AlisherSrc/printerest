import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username : string;
  password : string;
  email : string;
  registerMode : boolean;

  constructor(private auth : AuthService){
    this.username = '';
    this.password = '';
    this.email = '';
    this.registerMode = false;
  }


  toggleRegisterMode = () =>{
    this.registerMode = !this.registerMode;
  }
}
