import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";
import {NgForm, FormGroup} from "@angular/forms/forms";

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiServiceService) { }
  updateForm: Object;
  editForm: NgForm;
  image;
  oldImage;
  ngOnInit() {
    let userId = localStorage.getItem('editId');

    /* Set User Details by it's Id for that call api*/
    if(userId != null){
      this.apiService.editUser(userId).subscribe(result => {
        if(result.meta['status_code'] === 200){
            this.updateForm = result['data'].userDetails;
            this.image = result['data'].userDetails.image;
            this.oldImage = result['data'].userDetails.image;
          // console.log(this.image);
        }
        else{
          alert("Details Not Getting");
          this.router.navigate(['/login'])
        }
      });
    }
    else{
      console.log("error");
      this.router.navigate(['/login']);
    }
  }

  fileUpload(event){
    if(event.target.files.length > 0){
      this.image= event.target.files[0];
    }
  }

  onSubmit(userData){
    const payLoad = new FormData();
    payLoad.append('firstName', userData.firstName);
    payLoad.append('lastName', userData.lastName);
    payLoad.append('email', userData.email);
    if(this.image != this.oldImage){
      payLoad.append('image', this.image);
    }

    /* Api Call on Service*/
    this.apiService.updateDetails(payLoad).subscribe(result => {

      if(result.meta['status_code'] === 200){
        alert("Details Update Successfully");
        localStorage.removeItem('editId');
        this.router.navigate(['/dashboard']);
      }
      else{
        alert("!Opps Some Error Occurs while Update Details");
        localStorage.removeItem('editId');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

  /*For Display Image At Update If user Not Changed*/
  imageShow = true;
  displayImage(){
    this.imageShow = false;
  }

}
