import { Component, OnInit } from '@angular/core';
import { APIService } from '../../service/API.service';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  submitted = false;
  isAuth: Boolean;
  renders: any = []
  searchText: string;
  id = this.actRoute.snapshot.paramMap.get('id');

  constructor(private apiService: APIService, private actRoute: ActivatedRoute, public authService: AuthenticationService) { }

  ngOnInit(): void {

    this.needFresh()

    this.isAdmin()

    this.apiService.getImages().subscribe(data => {

      this.renders = data

    }
    );
  }

  isAdmin() {
    let logged = localStorage.getItem("access_token") ? true : false;

    let faggot = localStorage.getItem("needFresh") ? true : false;
    if (logged && !faggot) {
      const tokenContent = this.authService.getDecoded();

      let str = tokenContent.data.sub
      let res = str.split("-");
      (res[0] == 2) ? this.isAuth = true : this.isAuth = false

    }
  }

  needFresh() {


    let refresh = localStorage.getItem("firstLog") ? true : false


    if (refresh) {
      localStorage.removeItem("firstLog")

      window.location.reload()
    }
  }
}
