import { Component } from '@angular/core';

@Component({
selector: 'app-profile',
templateUrl: './profile.component.html',
styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

activeSection = 'created'; // set the default active section to 'created'

showSection(section: string) {
this.activeSection = section;
}

}