import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { PinsService } from '../pins-service.service';
import { UserService } from '../user.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  email: string;
  registerMode: boolean;

  constructor(private auth: AuthService,
    private pinsService: PinsService,
    private userService: UserService
  ) {
    this.username = '';
    this.password = '';
    this.email = '';
    this.registerMode = false;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.setLoggedIn(true);

    }
  }


  toggleRegisterMode = () => {
    this.registerMode = !this.registerMode;
  }

  login = async () => {
    // this.auth.login(this.username,this.password).subscribe((data) => {
    //   localStorage.setItem('token',data.token);
    //   localStorage.setItem('username',this.username);
    //   this.auth.setLoggedIn(true);
    //   this.userService.setCurrentUsername(this.username);
    // })

    const data = await lastValueFrom(this.auth.login(this.username, this.password));
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', this.username);
    this.auth.setLoggedIn(true);
    await this.userService.setCurrentUsername(this.username);

    console.log("Registered mode: " + this.registerMode);
  }

  resgiter = () => {

  }
}
