import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.getUsers().subscribe((data: User[]) => {
      data.forEach((el) => {
        if (el.status === 'online') {
          this.users.push(el.username);
        }
      });
    });
  }

}
