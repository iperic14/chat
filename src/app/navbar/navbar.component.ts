import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn = false;
  uid: string;
  constructor(private af: AngularFireAuth, private auth: AuthService, private chat: ChatService) { }

  ngOnInit() {
    this.af.authState.subscribe((auth) => {
      if (auth) {
        this.loggedIn = true;
        this.uid = auth.uid;
      } else {

        // this.auth.setStatusOffline(auth.uid);
      }
    });
  }
  logout() {
    this.auth.setStatusOffline(this.uid);
    this.auth.logout();
    this.loggedIn = false;
  }
  check() {
    // this.chat.getUID();
    // this.chat.checkUsername().subscribe(data => console.log(data));
  }
}
