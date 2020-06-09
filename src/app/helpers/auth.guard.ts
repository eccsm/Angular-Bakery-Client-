import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
declare let alertify;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      let authStr = localStorage.getItem("access_token");

      const tokenContent = this.authService.getDecoded();

       if (authStr) {
  
         if (tokenContent.data.exp <Math.floor(Date.now()/1000)) {
  
           alertify.error("Your session was ended you need to login!");
           this.router.navigate(['/login'])
           return false;
  
         }
         else {
           return true
         }
  
  
       }
       else {
         alertify.error("You need to login!");
         this.router.navigate(['/login'])
         return false;
       }
  }
  
}
