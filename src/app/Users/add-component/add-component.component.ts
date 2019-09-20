import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiServiceService,
              private  toaster: ToastrService
  ) { }

  image: any;
  spinner: boolean;
  ngOnInit() {
  }

  /*
  * File Uploading When User Select
  * */
  fileUpload(event){
    if(event.target.files.length > 0){
      this.image= event.target.files[0];
    }
  }

  /*
  * Submit User Registration Details and Store it
  * With User Image In Http Passed as a Form Data
  * */
  onSubmit(userData){
    this.spinner = true;
    console.log(userData);
    const payLoad = new FormData();
    payLoad.append('firstName', userData.firstName);
    payLoad.append('lastName', userData.lastName);
    payLoad.append('email', userData.email);
    payLoad.append('image', this.image);
    payLoad.append('password', userData.password);
    payLoad.append('confirmPassword', userData.confirmPassword);
    this.apiService.registerUser(payLoad).subscribe(result => {
      this.spinner = false;
      if(result.meta['status_code'] === 422){
        this.toaster.error('Data Validation Error');
        this.router.navigate(['/register']);
      }
      if(result.meta['status_code'] === 401){
        this.toaster.error('You don\'t have permission to add image');
        this.router.navigate(['/register']);
      }
      if(result.meta['status_code']=== 200){
        localStorage.removeItem('token');
        this.toaster.success('User Register Successfully');
        this.router.navigate(['/login']);
      }
      else{
        this.toaster.error('!Oops Some Error Occurs in Register');
        this.router.navigate(['/register']);
      }
    }, error => {
      this.spinner = false;
      this.toaster.error(error);
    });
  }
}