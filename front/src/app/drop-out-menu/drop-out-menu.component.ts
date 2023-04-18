import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-drop-out-menu',
  templateUrl: './drop-out-menu.component.html',
  styleUrls: ['./drop-out-menu.component.css']
})
export class DropOutMenuComponent {

  constructor(private auth: AuthService){

  }

  logout = () => {
    localStorage.removeItem('token');
    this.auth.setLoggedIn(false);
  }
}
