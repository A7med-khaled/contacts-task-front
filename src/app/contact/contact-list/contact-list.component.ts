import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { SocketService } from 'src/app/services/socket.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  listOfContact = [];
  searchTxt = '';
  pageNo = 0;
  limitNo = 5;

  totalContactCount = 0;

  constructor(
    private authService: AuthenticationService,
    private httpServ: HttpService,
    private socketServ: SocketService,
    public dialog: MatDialog) {
    this.getContact()
  }

  getContact() {
    this.httpServ.getcontacts(this.pageNo, this.limitNo, this.searchTxt).subscribe((data) => {
      this.listOfContact = data['contact']
      this.totalContactCount = data['contactCount']
    });
  }

  ngOnInit(): void {
    this.socketServ.editChange.subscribe(()=>{
      this.getContact();
    });
  }

  handlePage(e: any) {
    this.pageNo = e.pageIndex;
    this.limitNo = e.pageSize;
    console.log(' this.pageNo', this.pageNo)
    console.log(' this.limitNo', this.limitNo)
    this.getContact()

  }

  openAddNewForm() {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContact();
    });
  }

  logout() {
    this.authService.logout();
  }
}


