import { User } from './../models/user.model';
import { Message } from './../models/message.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages: AngularFirestoreCollection<Message>;
  username: string;
  usersRef = this.db.collection('messages', ref => ref.orderBy('key', 'desc'));
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.messages = this.db.collection('messages');
    // this.messages.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as Message;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );

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

  getMessagesWithId() {
    return this.messages.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Message;
        const id = a.payload.doc.id;
        console.log(id, data);
        return { id, ...data };
      }))
    );
    // return this.messages;
  }
  getUsers() {
    return this.db.collection('users').valueChanges();
  }
  sendMessage(input: any) {
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
     // something
  }

  deleteMessage() {
    // this.db.collection('messages').doc()
  }
}
