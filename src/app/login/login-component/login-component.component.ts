import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../../service/auth-service.service";
import {UserIdleService} from "angular-user-idle";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthServiceService,
              private userIdle: UserIdleService,
              private toaster: ToastrService
  ) { }
  spinner: boolean;
  
  /*
  * Remove Old Edit Id and Token Id and Delete Id
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
      this.toaster.success('Login Successfully');
      this.spinner = false;
      if(data != null){

        /*
         * For Timer Start
         * */
        this.userIdle.startWatching();
        this.userIdle.onTimerStart().subscribe(result => {
          if(result == 3){
            this.toaster.warning('Session Expire');
            this.authService.logOut();
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
          this.toaster.error("!Opps Login Access Is Not Allowed");
          this.router.navigate(['/login']);
        }
      }
      else{
        this.toaster.error("!Opps Some Error Occurs While Login");
        this.router.navigate(['/login']);
      }
    },
    error => {
      this.spinner = false;
      this.toaster.error(error);
    });
  }
}
