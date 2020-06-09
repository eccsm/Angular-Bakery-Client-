import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../service/API.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare let alertify: any;

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  submitted = false;
  ItemForm: FormGroup;
  ImageForm: FormGroup;
  category: any = [];
  selectedValue;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: APIService) { this.mainForm(); }

  ngOnInit(): void {

    this.apiService.getCategories().subscribe((data) => {
      this.category = data;
    })
  }

  get name() { return this.ItemForm.get('name'); }
  get description() { return this.ItemForm.get('description'); }
  get categoryId() { return this.ItemForm.get('categoryId'); }

  mainForm() {
    this.ItemForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(4)]],
      description: ['', [Validators.required,Validators.minLength(10),]],
      categoryId: ['', [Validators.required]],
    })
  }

  get myForm() {
    return this.ItemForm.controls;
  }

  public onFileChanged(event) {

    this.selectedFile = event.target.files[0];
  }
  
  uploadImage(id)
  {
    var uploadImageData = new FormData();
    uploadImageData.append("file", this.selectedFile);
    this.apiService.uploadImage(uploadImageData,id).subscribe()
  }

  setCategory() {
    let id = this.selectedValue
    this.apiService.getCategory(id).subscribe(data => {
      this.ItemForm.get("category").setValue({ id: data.id, name: data.name })
    })
  }
  onSubmit() {
    this.submitted = true;
    if (!this.ItemForm.valid) {
      return;
    } else {
      this.apiService.createProduct(this.ItemForm.value).subscribe(data=>
        {
          this.uploadImage(data.id)
          alertify.success(this.ItemForm.get("name").value + " has updated..")
        }
        )
    this.router.navigateByUrl('/product');
  }
}
}