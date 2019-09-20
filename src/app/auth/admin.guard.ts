import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{
  constructor(private router: Router, private toaster: ToastrService) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('role') === "Admin"){
      return true;
    }
    else{
      this.toaster.error("You Can Not Allowed To Access This Url");
      this.router.navigate(['/login']);
    }
  }
}
