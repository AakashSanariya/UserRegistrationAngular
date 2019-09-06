import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiServiceService) { }

  userDetails;
  dtOptions: DataTables.Settings;
  ngOnInit() {
    this.apiService.userList().subscribe(result => {
      if(result.meta['status_code'] === 200){
        this.userDetails = result['data'].userDetails;
        this.dtOptions = {
          "pagingType": 'full_numbers',
          "pageLength": 5,
          "processing": true,
        };
      }
      else{
        alert("!Oops Some Error Occurs");
        this.router.navigate(['/login']);
      }
    });
  }

  /*
  * Delete User
  */
  deleteUser(userDetails){
    this.apiService.deleteUser(userDetails).subscribe(result => {
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
  */
  editUser(userDetails){
    localStorage.setItem('editId', userDetails.id);
    this.router.navigate(['/edituser']);
  }
}
