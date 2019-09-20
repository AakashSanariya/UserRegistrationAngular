import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements  CanActivate{
  constructor(private router: Router, private toaster: ToastrService){}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      this.toaster.error('Please Login First');
      this.router.navigate(['/login']);
    }
  }
}
