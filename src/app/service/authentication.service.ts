import { Injectable } from '@angular/core';
import { JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( public jwtHelper: JwtHelperService) { }

  jwtOptionsFactory(tokenService) {
    return {
      tokenGetter: () => {
        return tokenService.getAsyncToken();
      }
    }
  }
  getDecoded() {
    return {
      data :this.jwtHelper.decodeToken(this.getAccessToken())
    }
  }
  getAccessToken() {

    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }
}
