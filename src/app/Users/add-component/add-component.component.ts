import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiServiceService) { }

  image;
  spinner;
  ngOnInit() {
  }

  /*
  * File Uploading When User Select
  * */
  fileUpload(event){
    if(event.target.files.length > 0){
      this.image= event.target.files[0];
      // let image = ngForm;
      // this.image.setValue(Image);
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
        alert("Data Validation Error");
        this.router.navigate(['/register']);
      }
      if(result.meta['status_code'] === 401){
        alert("You don't have permission to add image");
        this.router.navigate(['/register']);
      }
      if(result.meta['status_code']=== 200){
        localStorage.removeItem('token');
        alert('User Register Successfully');
        this.router.navigate(['/login']);
      }
      else{
        alert("!Oops Some Error Occurs in Register");
        this.router.navigate(['/register']);
      }
    });
  }
}