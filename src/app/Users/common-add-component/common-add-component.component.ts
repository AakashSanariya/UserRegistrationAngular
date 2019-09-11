import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";
import {ApiResponse} from "../../Model/api-response";
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-common-add-component',
  templateUrl: './common-add-component.component.html',
  styleUrls: ['./common-add-component.component.css']
})
export class CommonAddComponentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiServiceService, private router: Router) { }
  userDetails = new ApiResponse();
  userForm: NgForm;
  spinner;
  updateId;
  image;
  oldImage;
  setNewPassword = true;
  imageShow = true;

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
          console.log(this.userDetails);
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
    if(this.updateId == null){
      let date = userData.DOB.year+'-'+userData.DOB.month+'-'+userData.DOB.day;
      const payLoad = new FormData();
      payLoad.append('firstName', userData.firstName);
      payLoad.append('lastName', userData.lastName);
      payLoad.append('email', userData.email);
      payLoad.append('image', this.image);
      payLoad.append('mobileNo', userData.mobileNo);
      payLoad.append('gender', userData.gender);
      payLoad.append('DOB', date);
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

    else{
      let date = userData.DOB.year+'-'+userData.DOB.month+'-'+userData.DOB.day;
      const payLoad = new FormData();
      this.spinner = true;
      payLoad.append('firstName', userData.firstName);
      payLoad.append('lastName', userData.lastName);
      payLoad.append('email', userData.email);
      payLoad.append('mobileNo', userData.mobileNo);
      payLoad.append('gender', userData.gender);
      payLoad.append('DOB', date);
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
