import { Component, OnInit } from '@angular/core';
import { APIService } from '../../service/API.service';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from '../../service/authentication.service';
declare let alertify: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private apiService: APIService,
    public fb: FormBuilder,
    private router: Router, public authService: AuthenticationService) { }

  ngOnInit(): void {


    this.form = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required,Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    })

  }
  get fullname() { return this.form.get('fullname'); }
  get email() { return this.form.get('email'); }
  get message() { return this.form.get('message'); }



  getItem() {

    const tokenContent = this.authService.getDecoded();
    let str = tokenContent.data.sub
    let res = str.split("-");

    this.apiService.getUsers().subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        if (data[i].fullname == res[1]) {
          this.form.setValue({
            fullname: data[i].fullname,
            email: data[i].email,
            message: ''
          });
        }
      }

    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      return;
    } else {


      this.apiService.contact(this.form.get("fullname").value, this.form.get("email").value, this.form.get("message").value).subscribe(

        alertify.success("Thank you for your interest to us " + this.form.get("fullname").value + " we will reach you soon..")

      )

      this.router.navigateByUrl('/product');

    }
  }

}
