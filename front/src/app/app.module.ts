import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PinComponent } from './pin/pin.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DropOutMenuComponent } from './drop-out-menu/drop-out-menu.component';
import { DropOutNotificationsComponent } from './drop-out-notifications/drop-out-notifications.component';
import { DropOutMessagesComponent } from './drop-out-messages/drop-out-messages.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PinComponent,
    HomeComponent,
    NotfoundComponent,
    DropOutMenuComponent,
    DropOutNotificationsComponent,
    DropOutMessagesComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
