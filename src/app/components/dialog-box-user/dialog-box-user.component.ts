import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from "../../service/API.service";

export interface UserData {
  fullname: string,
  role: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box-user',
  templateUrl: './dialog-box-user.component.html',
  styleUrls: ['./dialog-box-user.component.css']
})
export class DialogBoxUserComponent implements OnInit {
  form: FormGroup;
  selectedValue;
  loading = false;
  submitted = false;
  role: any[]
  isAdmin: Boolean;
  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserData, private formBuilder: FormBuilder,
    private apiService: APIService) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.isAdmin = this.local_data.role == "Admin" ? true : false

  }
  ngOnInit() {

    this.apiService.getRoles().subscribe((data) => {
      this.role = data;
    })

    this.form = this.formBuilder.group({
      roleId: ['', [Validators.required]],
      isBlocked: ['', [Validators.required]]
    });

    this.getItem()
  }

  getItem() {
    this.apiService.getUser(this.local_data.id).subscribe(data => {
      this.form.setValue({
        roleId: data['roleId'],
        isBlocked: data['isBlocked'],
      });
    });
  }

  onSubmit() {


    this.dialogRef.close({ event: this.action, data: this.form.value,extra:this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
