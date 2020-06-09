import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { APIService } from './../../service/API.service';
declare let alertify;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  confirm = true;
  token;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private apiService: APIService) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.token = params["token"]
    });
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      re_password: ['', Validators.required]
    });
  }

  get password() { return this.form.get('password'); }
  get re_password() { return this.form.get('re_password'); }

  onSubmit() {
    this.submitted = true;
    this.confirm = true;

    if (this.form.invalid || this.form.get("password").value !== this.form.get("re_password").value) {
      if (this.form.get("re_password").value != this.form.get("password").value) {
        this.confirm = false;
      }
      return;
    }

    this.loading = true;
    this.apiService.resetPassword(this.token, this.form.get("password").value)
      .pipe(first())
      .subscribe(

        alertify.success("Password Successfully Changed")

      );
    this.router.navigate(['/login'])
  }


}
