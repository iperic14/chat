import { User } from './../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid: string;
  public displayName;
  constructor(private af: AngularFireAuth, private route: Router, private db: AngularFirestore) {
    this.af.authState.subscribe(user => {
      this.uid = user.uid;
    });
   }

  login(email: string, password: string) {
    this.af.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.route.navigate(['/login']);
    this.af.auth.signOut();
  }
  signup(email: string, password: string) {
    this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  setStatusOnline(uid: string) {
    if (this.db.collection('users').doc(uid)) {
      this.db.collection('users').doc(uid).update({status: 'online'});
    }
  }

  setStatusOffline(uid: string) {
    if (this.db.collection('users').doc(uid)) {
      this.db.collection('users').doc(uid).update({status: 'offline'});
    }
  }

  check() {
    return this.displayName;
  }
  createUser(user: User, uid: string) {
    this.db.collection('users').doc(uid).set(user);
  }
  // getUser() {
  //   this.db.collection('users').doc(this.uid).valueChanges();
  // }
}
