import { Component, LOCALE_ID, Inject } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  name: String;
  isAdmin;

  languageList = [
    { code: 'en', label: 'English' },
    { code: 'tr', label: 'Türkçe' }];

  logged = localStorage.getItem("access_token") ? true : false;

  faggot = localStorage.getItem("firstLog") ? true : false;

  constructor(public authService: AuthenticationService, translate: TranslateService,@Inject(LOCALE_ID) protected localeId: string) {

    // translate.setDefaultLang('en');

    // translate.use('en');

    if (this.logged && !this.faggot) {

      const tokenContent = this.authService.getDecoded();
      let str = tokenContent.data.sub
      let res = str.split("-");
      this.name = res[1]
      res[0] == 2 ? this.isAdmin = true : this.isAdmin = false
    }
    else {

    }
  }


  logout(): any {

    localStorage.removeItem("access_token");
    window.location.reload();
  }


}
