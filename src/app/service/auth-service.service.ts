import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs/index";
import {ApiResponse} from "../Model/api-response";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router, private http:HttpClient) {
    
    /* Role Get Form Local Storage*/
    this.userRolePerDetails = new BehaviorSubject(localStorage.getItem('role'));
    this.userRole = this.userRolePerDetails.asObservable();
  }
  userDetails: Observable<ApiResponse>;
  userRolePerDetails: BehaviorSubject<any>;
  userRole: Observable<any>;
  baseUrl = "http://api.userregistration.com/api/";

  /* For Login */
  login(loginPayload):Observable<ApiResponse>{
    this.userDetails = this.http.post<ApiResponse>(this.baseUrl + 'user/login', loginPayload);
    return this.userDetails;
  }

  public get currentUserRole():any{
    // console.log(this.userRolePerDetails.value);
    return this.userRolePerDetails.value;
  }

  /*For LogOut*/
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }
}
