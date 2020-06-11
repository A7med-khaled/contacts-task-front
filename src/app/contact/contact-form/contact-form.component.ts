import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private httpServ: HttpService) {
    this.createForm(data.contact)
  }

  ngOnInit(): void {
  }

  createForm(contact?) {
    this.contactForm = this.fb.group({
      name: [(contact) ? contact.name : '', [Validators.required, Validators.min(5)]],
      phone: [(contact) ? contact.phone : '', [Validators.required, Validators.minLength(11), , Validators.maxLength(11)]],
      address: [(contact) ? contact.address : '', [Validators.required, Validators.min(5)]],
      notes: [(contact) ? contact.notes : '', [Validators.required, Validators.min(5)]]
    });
  }

  onSaveNew() {
    if (this.contactForm.valid) {
      let contactData = this.contactForm.value;
      this.httpServ.addContact(contactData).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'added successfully',
          timer: 1000
        });
        this.onCancelClick()
      });
    }
  }

  onSaveEdit() {
    if (this.contactForm.valid) {
      let contactData = this.contactForm.value;
      let id = this.data.contact._id;
      this.httpServ.editContact(contactData, id).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'saved successfully',
          timer: 1000
        });
        this.onCancelClick()
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}