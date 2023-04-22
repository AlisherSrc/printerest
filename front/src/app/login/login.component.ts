import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { PinsService } from '../pins-service.service';

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

  constructor(private auth : AuthService,
              private pinsService : PinsService ){
    this.username = '';
    this.password = '';
    this.email = '';
    this.registerMode = false;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const token = localStorage.getItem('token');
    if(token){
      this.auth.setLoggedIn(true);

    }
  }


  toggleRegisterMode = () =>{
    this.registerMode = !this.registerMode;
  }

  login = () => {
    this.auth.login(this.username,this.password).subscribe((data) => {
      localStorage.setItem('token',data.token);
      localStorage.setItem('username',this.username);
      this.auth.setLoggedIn(true);
    })
  }

  resgiter = () => {

  }
}
