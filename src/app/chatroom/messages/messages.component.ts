import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: any;
  constructor(private chatService: ChatService, private af: AngularFireAuth) {}

  ngOnInit() {
    this.messages = this.chatService.getMessages();
    // this.chatService.getMessages().subscribe(data => console.log(data));
  }

  check() {
    this.chatService.getMessagesWithId().subscribe(data => console.log(data));
  }

  deleteMessage(e) {
    console.log(e.target);
  }
}
