import { Component } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eFile-taskFront';
  constructor(private socketServ: SocketService){
    this.socketServ.setupSocketConnection();
  }
}
