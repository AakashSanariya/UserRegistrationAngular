import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from "../service/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{
  constructor(private router: Router) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('role') === "Admin"){
      return true;
    }
    else{
      alert("You Can Not Allowed To Access This Url");
      this.router.navigate(['/login']);
    }
  }
}
