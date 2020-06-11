import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
 
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;
  editChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');

    this.socket.on('edited',()=>{
      this.editChange.emit('');
      console.log('event happen')
    })
  }

  
}
