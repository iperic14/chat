import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private auth: AuthService, private af: AngularFireAuth, private route: Router) { }

  ngOnInit() {
    this.subscription = this.af.authState.subscribe((auth) => {
      if (auth) {
        this.route.navigate(['/chatroom']);
        this.auth.setStatusOnline(auth.uid);
      }
    });
  }
  onSubmit(data: any) {
    this.auth.login(data.email, data.password);
  }
  check() {
    // console.log(this.af.auth.currentUser);
    // console.log(this.auth.check());
  }
  ngOnDestroy() {
  this.subscription.unsubscribe();
 }
}
