import { Component, OnInit } from '@angular/core';
import { APIService } from '../../service/API.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare let alertify: any;

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  submitted = false;
  category: any = [];
  selectedValue;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  products: Array<any>
  id = this.actRoute.snapshot.paramMap.get('id');
  editForm: FormGroup;
  wasDelete: boolean = false;
  image: any;

  constructor(private apiService: APIService,
    private actRoute: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.apiService.getCategories().subscribe((data) => {
      this.category = data;
    })

    this.editForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(4)]],
      description: ['', [Validators.required,Validators.minLength(10),]],
      categoryId: ['', [Validators.required]],
    })

    this.getItem();
    this.getImage();
  }

  get name() { return this.editForm.get('name'); }
  get description() { return this.editForm.get('description'); }
  get categoryId() { return this.editForm.get('categoryId'); }
  get myForm() {
    return this.editForm.controls;
  }

  getImage() {
    this.apiService.getImages().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].product.id == this.id) {
          this.image = data[i].fileDownloadUri
        }
      }
    })
  }

  getItem() {
    this.apiService.getProduct(this.id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        description: data['description'],
        categoryId: data['categoryId'],
      });
    });
  }

  removeItem() {
    this.getItem();
    this.apiService.deleteImage(this.id).subscribe()
    this.apiService.deleteProduct(this.id).subscribe(
      alertify.error(this.editForm.get("name").value + " has deleted..")
    )
    this.router.navigateByUrl('/product');
  }

  setCategory() {
    let id = this.selectedValue
    this.apiService.getCategory(id).subscribe(data => {
      this.editForm.get("category").setValue({ id: data.id, name: data.name })
    })
  }

  public onFileChanged(event) {

    this.selectedFile = event.target.files[0];
  }

  updateImage() {
    const uploadImageData = new FormData();
    uploadImageData.append("file", this.selectedFile);
    this.apiService.updateImage(uploadImageData, this.id).subscribe()
  }

  onSubmit() {
    this.submitted = true
    if (!this.editForm.valid) {
      return false;
    } else {
      this.updateImage()
      this.apiService.updateProduct(this.id, this.editForm.value)
        .subscribe(
          alertify.success(this.editForm.get("name").value + " has updated..")
        )
      this.router.navigateByUrl('/product');
    }
  }
}
