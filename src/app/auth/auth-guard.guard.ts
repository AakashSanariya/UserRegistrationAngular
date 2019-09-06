import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from "../service/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements  CanActivate{
  constructor(private router: Router, private authService: AuthServiceService ){}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      alert("please Login First");
      this.router.navigate(['/login']);
    }
  }
}
