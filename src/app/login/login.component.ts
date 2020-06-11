import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { AuthenticationService } from '../services/authentication.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthenticationService) {
    this.createForm();
  }
  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    if (this.loginForm.valid) {
      let userData = this.loginForm.value;
      this.httpService.login(userData).subscribe((data) => {
        console.log(data);
        this.authService.login(data['userData'], data['Token'])
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid Username or Psasseord',
          icon: 'error',
          timer: 2000,
          confirmButtonText: 'ok'
        })
      })
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'enter Username and Psasseord',
        icon: 'error',
        timer: 2000,
        confirmButtonText: 'ok'
      })
    }
  }
}
