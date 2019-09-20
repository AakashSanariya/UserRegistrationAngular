import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs/index";
import {ApiResponse} from "../Model/api-response";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userDetails: Observable<ApiResponse>;
  userRoleBehaviour: BehaviorSubject<any>;
  baseUrl = "http://api.userregistration.com/api/";

  constructor(private router: Router, private http:HttpClient) {

    /* Role Get Form Local Storage*/
    this.userRoleBehaviour = new BehaviorSubject(localStorage.getItem('role'));
  }

  /* For Login */
  login(loginPayload):Observable<ApiResponse>{
    this.userDetails = this.http.post<ApiResponse>(this.baseUrl + 'user/login', loginPayload);
    return this.userDetails;
  }

  public get currentUserRole():any{
    return this.userRoleBehaviour;
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
