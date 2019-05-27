import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Message } from './message.model';

@Injectable()
export class MessageService {
  constructor(private http: Http) {}

  postMessage(message: Message) {
    console.log(message);
    const headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    return this.http.post('http://localhost:49769/api/Chat',
      message,
      {headers: headers});
  }

  getMessages() {
    return this.http.get('http://localhost:49769/api/Chat')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }
}
