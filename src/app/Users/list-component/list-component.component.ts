import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";
import {Subject} from "rxjs/index";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  constructor(private router: Router,
              private apiService: ApiServiceService,
              private toaster: ToastrService
  ) { }

  spinner: boolean = true;
  userDetails: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  /*
  * When Page Render At that time User Details Listing
  * and Filling in Data Table
  * */
  ngOnInit() {
    this.apiService.userList().subscribe(result => {
      this.spinner = false;
      if(result.meta['status_code'] === 200){
        this.toaster.success('User Listing Successfully');
        this.userDetails = result['data'].userDetails;
        this.dtTrigger.next();
      }
      else{
        this.toaster.error('!Oops Some Error Occurs');
        this.router.navigate(['/login']);
      }
    }, error => {
      this.spinner = false;
      this.toaster.error(error);
    });

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
        this.toaster.error('!Opps Some Error Occurs While User Delete');
      }
    }, error => {
      this.toaster.error(error);
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
  * Approve User Or DisApprove User
  * */
  approve(userDetails){
    if(userDetails.status == "0"){
      userDetails.status = "1";
    }
    else{
      userDetails.status = "0";
    }
    let payload = new FormData();
    payload.append('status', userDetails.status);
    this.apiService.updateDetails(payload, userDetails.id).subscribe(result => {
      if(userDetails.status == "1"){
        this.toaster.success("User Activate Successfully");
      }
      if(userDetails.status == "0"){
        this.toaster.success('User DeActivate Successfully');
      }
    }, error => {
      this.spinner = false;
      this.toaster.error(error);
    });
  }
}
