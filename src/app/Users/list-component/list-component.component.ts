import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";
import {Subject} from "rxjs/index";

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiServiceService) { }

  spinner=true;
  userDetails = [];
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
        this.userDetails = result['data'].userDetails;
        this.dtTrigger.next();
      }
      else{
        alert("!Oops Some Error Occurs");
        this.router.navigate(['/login']);
      }
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
        alert("User Delete Successfully");
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
      else{
        alert("!Opps Some Error Occurs While User Delete");
      }
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
}
