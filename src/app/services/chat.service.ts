import { User } from './../models/user.model';
import { Message } from './../models/message.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  username: string;
  usersRef = this.db.collection('messages', ref => ref.orderBy('key', 'desc'));
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.pipe(
      map(user => user.uid)
    ).subscribe(uid => {
      this.db.collection('users').doc(uid).valueChanges().pipe(
        map((us: User) => us.username)
      ).subscribe(data => this.username = data);
    });
   }

  getMessages() {
    return this.db.collection('messages').valueChanges();
  }
  getUsers() {
    return this.db.collection('users').valueChanges();
  }
  sendMessage(input) {
    let message: Message;
    message = {
      user: this.username,
      text: input.message,
      date: new Date()
    };
    this.db.collection('messages').add(message);
  }
  checkUsername() {
    return this.usersRef.valueChanges();
  }
}
