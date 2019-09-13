import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";
import {ApiResponse} from "../../Model/api-response";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-common-add-component',
  templateUrl: './common-add-component.component.html',
  styleUrls: ['./common-add-component.component.css']
})
export class CommonAddComponentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiServiceService, private router: Router) { }
  userDetails = new ApiResponse();
  spinner; updateId; image; oldImage; setNewPassword = true; imageShow = true; colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;

  /*
   * File Uploading When User Select
   * */
  fileUpload(event){
    if(event.target.files.length > 0){
      this.image= event.target.files[0];
    }
  }

  /*For Display Image At Update If user Not Changed*/
  displayImage(){
    this.imageShow = false;
  }

  /*
   * For Set A New Password Than Display
   * */
  displayNewPassword(){
    this.setNewPassword = false;
  }
  ngOnInit() {
    this.bsConfig = Object.assign({ dateInputFormat: 'DD/MM/YYYY' }, { containerClass: this.colorTheme }, { isAnimated: true });
    this.route.paramMap.subscribe(params => {
      if(params.get('id') == null){
        this.imageShow = false;
        this.setNewPassword = false;
        this.updateId = null;
      }
      else{
        this.updateId = params.get('id');
        this.apiService.editUser(params.get('id')).subscribe(result => {
          this.userDetails = result['data'].userDetails;
          this.image = result['data'].userDetails.image;
          this.oldImage = this.userDetails.image;
          this.bsConfig = Object.assign({ dateInputFormat: 'DD/MM/YYYY' }, { containerClass: this.colorTheme }, { isAnimated: true });
        });
      }
    });
  }

  /*
   * Submit User Registration Details and Store it
   * With User Image In Http Passed as a Form Data
   * */
  onSubmit(userData){
    this.spinner = true;

    /*
    * For New User Registration
    * */
    if(this.updateId == null){
      const payLoad = new FormData();
      userData.DOB = new Date(userData.DOB).toLocaleDateString(); // Convert Date Into Short Date
      payLoad.append('firstName', userData.firstName);
      payLoad.append('lastName', userData.lastName);
      payLoad.append('email', userData.email);
      payLoad.append('image', this.image);
      payLoad.append('mobileNo', userData.mobileNo);
      payLoad.append('gender', userData.gender);
      payLoad.append('DOB', userData.DOB);
      payLoad.append('password', userData.password);
      payLoad.append('confirmPassword', userData.confirmPassword);
      this.apiService.registerUser(payLoad).subscribe(result => {
        this.spinner = false;
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

    /*
    * For Update Details
    * */
    else{
      const payLoad = new FormData();
      this.spinner = true;
      userData.DOB = new Date(userData.DOB).toLocaleDateString(); // For Convert Date Into Short Date
      payLoad.append('firstName', userData.firstName);
      payLoad.append('lastName', userData.lastName);
      payLoad.append('email', userData.email);
      payLoad.append('mobileNo', userData.mobileNo);
      payLoad.append('gender', userData.gender);
      payLoad.append('DOB', userData.DOB);
      if(userData.password != null && userData.password != ""){  // if new password is set than append to form data
        payLoad.append('password', userData.password);
      }
      if(this.image != this.oldImage){
        payLoad.append('image', this.image);
      }

      /* Api Call on Service*/
      this.apiService.updateDetails(payLoad,this.updateId).subscribe(result => {
        this.spinner = false;
        if(result.meta['status_code'] === 200){
          alert("Details Update Successfully");
          this.router.navigate(['/dashboard']);
        }
        else{
          alert("!Opps Some Error Occurs while Update Details");
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
    }
  }

  /*
  * Update User Details When Click
  * On Update
  * */
  /*onUpdate(userData){
    console.log("hii");

  }*/
}
