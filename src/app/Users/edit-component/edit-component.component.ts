import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../../service/api-service.service";
import {ApiResponse} from "../../Model/api-response";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {

  constructor(private router: Router,
              private apiService: ApiServiceService,
              private toaster: ToastrService
  ) { }
  updateForm: any = new ApiResponse();
  spinner: boolean = true;
  image: any;
  oldImage: any;

  /*
  * When page Load User Details Fetch
  * as per user Id And Put in Form as a
  * */
  ngOnInit() {
    let userId = localStorage.getItem('editId');
    /* Set User Details by it's Id for that call api*/
    if(userId != null){
      this.apiService.editUser(userId).subscribe(result => {
        this.spinner = false;
        if(result.meta['status_code'] === 200){
            this.updateForm = result['data'].userDetails;
            this.image = result['data'].userDetails.image;
            this.oldImage = result['data'].userDetails.image;
        }
        else{
          this.toaster.error('Your Information could not be Find.');
          this.router.navigate(['/login'])
        }
      }, error => {
        this.spinner = false;
        this.toaster.error(error);
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  /*
  * Image Upload When User Select New One
  * */
  fileUpload(event){
    if(event.target.files.length > 0){
      this.image= event.target.files[0];
      this.toaster.success("Image Upload Successfully");
    }
  }


  /*
  * Edit Form Submit Value And Update User Details
  * */
  onSubmit(userData){
    const payLoad = new FormData();
    this.spinner = true;
    payLoad.append('firstName', userData.firstName);
    payLoad.append('lastName', userData.lastName);
    payLoad.append('email', userData.email);
    if(this.image != this.oldImage){
      payLoad.append('image', this.image);
    }
    let userId = localStorage.getItem('editId');
    /* Api Call on Service*/
    this.apiService.updateDetails(payLoad, userId).subscribe(result => {
      this.spinner = false;
      if(result.meta['status_code'] === 200){
        this.toaster.success('Details Update Successfully');
        localStorage.removeItem('editId');
        this.router.navigate(['/dashboard']);
      }
      else{
        this.toaster.error('!Opps Some Error Occurs while Update Details');
        localStorage.removeItem('editId');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    }, error => {
      this.spinner = false;
      this.toaster.error(error);
    });
  }

  /*For Display Image At Update If user Not Changed*/
  imageShow: boolean = true;
  displayImage(){
    this.imageShow = false;
  }

}
