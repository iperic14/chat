import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor(private chat: ChatService) { }

  ngOnInit() {
  }
  onSubmit(messageData: NgForm) {
    console.log(messageData.value);
    this.chat.sendMessage(messageData.value);
    messageData.reset();
  }
}
