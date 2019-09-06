import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../service/auth-service.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = 'User Registration';
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
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

  logOut(){
    this.authService.logOut();
  }

}
