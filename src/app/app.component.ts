import { Component, OnInit } from '@angular/core';
import {UserIdleService} from "angular-user-idle";
import {ToastrService} from "ngx-toastr";
import {AuthServiceService} from "./service/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'User Registration';
  
  constructor(private userIdle: UserIdleService,
              private  toaster: ToastrService,
              private authService: AuthServiceService
  ){}

  ngOnInit(){
    /*
     * For Timer Start
     * */
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(result => {
      if(result == 5){
        this.toaster.warning('Session Expire');
        this.authService.logOut();
      }
    }, error => {
      this.toaster.error(error);
    });
  }
}
