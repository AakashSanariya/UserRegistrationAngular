import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../service/auth-service.service";
import {ApiServiceService} from "../../service/api-service.service";
import {BehaviorSubject, Observable} from "rxjs/index";
import {Role} from "../../Model/role.enum";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = 'User Registration';
  userName: string;
  userRole: any;
  constructor(private authService: AuthServiceService,private apiService: ApiServiceService) {
  }

  ngOnInit() {
    this.userRole = this.authService.currentUserRole;
    let userName = localStorage.getItem('userName');
    /*
     * For Display User Name In Nav-Bar
     * */
    if(userName != null){
      this.userName = userName;
    }
  }

  ngDoCheck(){
    this.userRole = localStorage.getItem('role');
    this.userName = localStorage.getItem('userName');
  }

  public get isAdmin(){
    return this.userRole == Role.Admin;
  }

  /*Login and Logout Button Display*/
  logOutButtonDisplay(){
    let hastoken = window.localStorage.getItem('token');
    if(hastoken){
      return true;
    }
    else{
      return false;
    }
  }

  /*
  * Remove Token And Logout 
  * */
  logOut(){
    this.authService.logOut();
  }

}
