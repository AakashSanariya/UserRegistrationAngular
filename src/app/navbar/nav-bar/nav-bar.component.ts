import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../service/auth-service.service";
import {ApiServiceService} from "../../service/api-service.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = 'User Registration';
  constructor(private authService: AuthServiceService,private apiService: ApiServiceService) { }

  userName: string;
  ngOnInit() {
    let userId = localStorage.getItem('userId');
    this.apiService.editUser(userId).subscribe(result => {
      this.userName = result['data'].userDetails.firstName;
    });
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
