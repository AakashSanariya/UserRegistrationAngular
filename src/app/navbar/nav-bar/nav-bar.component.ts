import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AuthServiceService} from "../../service/auth-service.service";
import {Role} from "../../Model/role.enum";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NavBarComponent implements OnInit {
  title = 'User Registration';
  userName: string;
  userRole: any;
  constructor(private authService: AuthServiceService) {
  }

  ngOnInit() {
    this.userRole=this.authService.currentUserRole;
    this.userRole = localStorage.getItem('role');
    this.userName = localStorage.getItem('userName');
  }

  ngDoCheck(){
    if(this.userName != localStorage.getItem('userName') || this.userRole != localStorage.getItem('role')){
      this.userName = localStorage.getItem('userName');
      this.userRole = localStorage.getItem('role');
    }
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
    this.ngOnDestroy();
    this.authService.logOut();
  }

  ngOnDestroy(){
  }
}
