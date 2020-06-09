import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { APIService } from './../../service/API.service';
declare let alertify;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  exist;
  user: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private apiService: APIService) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe(data => { this.user = data })
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  get username() { return this.form.get('username'); }

  isUserExist() {

    this.exist = false
    for (let i = 0; i < this.user.length; i++) {
      if (this.user[i].username == this.form.get('username').value) {
        this.exist = true
      }
    }
  }

  onSubmit() {
    
    this.submitted = true;
    this.exist = true
    this.isUserExist()
    if (this.form.invalid || !this.exist) {
      return;

    }
    else {

      this.loading = true;
      this.apiService.forgotPassword(this.form.get("username").value)
        .pipe(first())
        .subscribe(
          alertify.success('Please check your email and follow the instructions')
        );
      this.router.navigate(['/login']);

    }
  }

}
