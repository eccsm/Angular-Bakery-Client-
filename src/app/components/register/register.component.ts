import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { APIService } from './../../service/API.service';
import { AuthenticationService } from "../../service/authentication.service";
declare let alertify;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    confirm = true;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private apiService: APIService
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            fullname: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            password: ['', [Validators.required, Validators.minLength(6)]],
            re_password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get username() { return this.registerForm.get('username'); }
    get fullname() { return this.registerForm.get('fullname'); }
    get email() { return this.registerForm.get('email'); }
    get password() { return this.registerForm.get('password'); }
    get re_password() { return this.registerForm.get('re_password'); }

    onSubmit() {
        this.submitted = true;
        this.confirm = true;

        if (this.registerForm.invalid || this.registerForm.get("re_password").value != this.registerForm.get("password").value) {
            if (this.registerForm.get("re_password").value != this.registerForm.get("password").value) {
                this.confirm = false;
            }
           
            return;
        }

        this.loading = true;
        this.apiService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    alertify.success('Registration successful please Login', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    alertify.error(error);
                    this.loading = false;
                });
    }
}
