import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Message } from './message.model';
import { MessageService } from './messages.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  private messages: Message[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = [];
    //Get Messages every 3 seconds
    Observable.interval(3000).takeWhile(() => true).subscribe(() => this.onGetMessages());
  }

  onGetMessages() {
    console.log('Called');
    this.messageService.getMessages()
      .subscribe(
        (message) => {
          if(message != null) {
            debugger;
            return this.messages.push(message);
          }
        },
        (error) => console.log(error)
      );
  }

  onPostMessage(form: NgForm) {
    debugger;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    const value = form.value;
    const newMessage = new Message(dateTime, value.name, value.body);
    this.messageService.postMessage(newMessage).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );;
    form.reset();
  }
}
