import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../../service/auth-service.service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private router: Router, private authService: AuthServiceService) { }
  spinner;  
  ngOnInit() {
    localStorage.removeItem('editId');
    localStorage.removeItem('token');
  }
  onSubmit(payLoad){
    this.spinner = true;
    this.authService.login(payLoad).subscribe(data => {
      this.spinner = false;
      if(data != null){
        if(data['data'].token != null){
          localStorage.setItem('token', data['data'].token);
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
