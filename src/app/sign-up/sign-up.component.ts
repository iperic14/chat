import { ChatService } from './../services/chat.service';
import { User } from './../models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Form, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  formData: User;
  message: string;
  subscription: Subscription;
  constructor(private auth: AuthService, private af: AngularFireAuth, private route: Router) { }

  ngOnInit() {
    this.subscription = this.af.authState.subscribe((auth) => {
      if (auth && this.formData.email !== null) {
        const userData = {
          email: this.formData.email,
          password: this.formData.password,
          username: this.formData.username,
          status: 'online'
        };
        this.auth.createUser(userData, auth.uid);
        this.route.navigate(['/chatroom']);
      }
    });
  }
  onSubmit(data: any) {
    this.formData = data;
    this.auth.signup(data.email, data.password);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
