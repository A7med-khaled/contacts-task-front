import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2'
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  @Output() deleted = new EventEmitter();
  @Input() contact : {
    _id:string,
    name:string,
    phone:string,
    address:string,
    notes:string
  };

  currentUser;
  constructor( private httpServ:HttpService , 
     public dialog: MatDialog,
     private authService:AuthenticationService) { 

     }

  ngOnInit(): void {
    console.table(this.contact)
   this.currentUser = this.authService.currentUserValue._id
  }
  
  deleteContact(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be delete Contact!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.httpServ.deleteContact(id).subscribe((data)=>{
          Swal.fire(
            'Deleted!',
            'Your contact has been deleted.',
            'success'
          )
          this.deleted.emit('');
         });
        
      }
    })

   
  }

  openEditNewForm(contact= this.contact) {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '50%',
      data: { contact, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleted.emit('');
    });
  }

}
