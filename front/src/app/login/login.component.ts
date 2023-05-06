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
  // login to forms itself, using input username and password and if everything is correct then it gives a JWT token that we use for every
  // request using Angular interceptor
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
    localStorage.setItem('password',this.password);
    this.auth.setLoggedIn(true);
    await this.userService.setCurrentUsername(this.username);

    console.log("Registered mode: " + this.registerMode);
  }

  register() {
    this.auth.register(this.username, this.email, this.password).subscribe(
      (response) => {
        console.log('User registered:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', this.username);
        localStorage.setItem('email',this.email);
        // localStorage.setItem('password',this.password);
        this.auth.setLoggedIn(true);
        this.auth.login(this.username,this.password);
        this.toggleRegisterMode();
      },
      (error) => {
        console.log('Registration error:', error);
      }
    );
    }
}
