import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../Model/api-response";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private router: Router, private http: HttpClient) { }

  /*
  * Api Base Url
  * */
  baseUrl = "http://api.userregistration.com/api/";

  /*New User Register*/
  registerUser(payLoad):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl + 'user/register', payLoad);
  }

  /*Listing User*/
  userList():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl + 'user');
  }

  /*
  * Delete User
  */
  deleteUser(payLoad):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.baseUrl + 'user/' + payLoad['id']);
  }

  /* Edit User*/
  editUser(payLoad):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl + 'user/' + payLoad);
  }


  /*
  * Update User Details
  * */
  updateDetails(payLoad):Observable<ApiResponse>{
    let id = localStorage.getItem('editId');
    return this.http.post<ApiResponse>(this.baseUrl + 'user/update/' + id, payLoad);
  }
}
