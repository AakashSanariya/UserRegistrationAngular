import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../../service/auth-service.service";
import {UserIdleService} from "angular-user-idle";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthServiceService,
              private userIdle: UserIdleService
  ) { }
  spinner;

  /*
  * Remove Edit Id and Token Id and Delete Id
  * */
  ngOnInit() {
    localStorage.removeItem('editId');
    localStorage.removeItem('deleteId');
    localStorage.removeItem('token');
  }

  /*
  * login Credential Success than Set Token and
   * Navigate to Dashboard
  * */
  onSubmit(payLoad){
    this.spinner = true;
    this.authService.login(payLoad).subscribe(data => {
      this.spinner = false;
      if(data != null){

        /*
         * For Timer Start
         * */
        this.userIdle.startWatching();
        this.userIdle.onTimerStart().subscribe(result => {
          if(result == 300){
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            alert("Session Expire");
            this.router.navigate(['login']);
          }
        });


        if(data['data'].data.token != null){
          localStorage.setItem('userName', data['data'].data.userName); // set User Name
          localStorage.setItem('userId', data['data'].data.userId); // set User Id
          localStorage.setItem('token', data['data'].data.token); // set Token
          localStorage.setItem('role', data['data'].data.role); // set User Role
          this.router.navigate(['/dashboard']);
        }
        else{
          alert("!Opps Login Access Is Not Allowed");
          this.router.navigate(['/login']);
        }
      }
      else{
        alert("!Opps Some Error Occurs While Login");
        this.router.navigate(['/login']);
      }
    });
  }

}
