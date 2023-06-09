import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateComponent } from './create/create.component';
import { AlbumComponent } from './album/album.component';
import { PinPageComponent } from './pin-page/pin-page.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'pin/:pinId',component:PinPageComponent},
  {path: 'profile',component:ProfileComponent},
  {path: 'settings',component:SettingsComponent},
  {path: 'pin-builder',component:CreateComponent},
  {path: 'albums/:username/:album',component:AlbumComponent},
  {path: 'pin-builder/:pinId',component:CreateComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
