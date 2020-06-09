import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../../service/API.service';
declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: APIService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  onSubmit() {
    this.submitted = true
    if (!this.form.valid) {
      return false;
    } else {

      this.apiService.login(this.form.value).subscribe(data => {
        localStorage.setItem('access_token', data[0])
        localStorage.setItem('firstLog', "true")
        alertify.success("Welcome " + data[5])

        this.router.navigateByUrl('/product');
      }
      )
      
      
    }

  }
}