import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";
import {ApiResponse} from "../../Model/api-response";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-particular-user-list',
  templateUrl: './particular-user-list.component.html',
  styleUrls: ['./particular-user-list.component.css']
})
export class ParticularUserListComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiServiceService,
              private toaster: ToastrService
  ) { }
  userDetails = new ApiResponse();
  spinner: boolean;
  ngOnInit() {
    let UserId = localStorage.getItem('userId');
    this.apiService.editUser(UserId).subscribe(result => {
      this.userDetails = result['data'].userDetails;
    },
    error => {
      this.toaster.error(error);
    });
  }

  /*
   * Edit User Details
   * and Navigate to Edit User Page
   */
  editUser(userDetails){
    this.router.navigate(['/register/', userDetails.id]);
  }


  /*
   * Delete User Profile
   */
  deleteUser(userDetails){
    this.spinner = true;
    this.apiService.deleteUser(userDetails).subscribe(result => {
      this.spinner = false;
      if(result.meta['status_code'] === 200){
        this.toaster.success('User Delete Successfully');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
      else{
        this.toaster.error("!Opps Some Error Occurs While User Delete");
      }
    }, error => {
      this.toaster.error(error);
    });
  }
}
