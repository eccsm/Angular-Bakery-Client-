import { Component, OnInit } from '@angular/core';
import { APIService } from '../../service/API.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare let alertify: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  submitted = false;
  category: any = [];
  product: any = [];
  products = Array<{ img: String, name: String, id: number }>()
  id = this.actRoute.snapshot.paramMap.get('id');
  image: any = [];

  constructor(private apiService: APIService,
    private actRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.apiService.getCategories().subscribe((data) => {
      this.category = data;
    })
    this.getImage()
    this.getProduct()
    this.getProducts()

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

  getProduct() {
    this.apiService.getProduct(this.id).subscribe(data => {
      this.product = data
    });
  }

  getProducts() {
    this.apiService.getImages().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].product.id == this.id) {

        }
        else {
          let idata = data[i].fileDownloadUri
          this.apiService.getProduct(data[i].product.id).subscribe(res => {
            this.products.push({ img: idata, name: res.name, id: data[i].product.id })
          })
        }
      }
    }
    );
  }
}