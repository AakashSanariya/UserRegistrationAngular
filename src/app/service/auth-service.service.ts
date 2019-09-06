import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../Model/api-response";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router, private http:HttpClient) { }

  baseUrl = "http://api.userregistration.com/api/";

  /* For Login */
  login(loginPayload):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl + 'user/login', loginPayload);
  }

  /*For LogOut*/
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
