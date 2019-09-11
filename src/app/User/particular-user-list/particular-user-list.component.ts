import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";
import {ApiResponse} from "../../Model/api-response";

@Component({
  selector: 'app-particular-user-list',
  templateUrl: './particular-user-list.component.html',
  styleUrls: ['./particular-user-list.component.css']
})
export class ParticularUserListComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiServiceService) { }
  userDetails: ApiResponse;
  ngOnInit() {
    let UserId = localStorage.getItem('userId');
    this.apiService.editUser(UserId).subscribe(result => {
      this.userDetails = result['data'].userDetails;
    });
  }

  /*
   * Edit User Details
   * and Navigate to Edit User Page
   */
  editUser(userDetails){
    localStorage.setItem('editId', userDetails.id);
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
        alert("User Delete Successfully");
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
      else{
        alert("!Opps Some Error Occurs While User Delete");
      }
    });
  }
}
