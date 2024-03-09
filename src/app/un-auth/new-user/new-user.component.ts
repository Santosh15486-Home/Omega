import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ClinicModel, UserModel } from 'src/app/dtos/patient.dto';
import { ModelService } from 'src/app/services/model.service';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewUserComponent  implements OnInit {

  public user: UserModel;
  public activeStep: number;
  public tempPass: string;
  public errorMessage: string[];

  constructor(
    private userService: UserService,
    public modelService: ModelService,
    private _location: Location
    ){

  }

  ngOnInit(): void {
    this.user = new UserModel();
    this.user.clinic = new ClinicModel();
    this.activeStep = 4;
    this.errorMessage = [];
  }

  public goToLogin(): void{
    this._location.back();
  }

  public nextStep(): void {
    this.errorMessage = [];
    if(this.validateData()){
      this.activeStep++;
    }
  }

  public prevStep(): void {
    this.activeStep--;
  }

  public createUser(): void {
    this.errorMessage = [];
    if((this.validatePasswords())){
      this.modelService.loading = true;
      this.userService.createUser(this.user).subscribe(resp=>{
        this.modelService.loading = false;
        if (resp.body.code == "SUCCESS") {
          this.modelService.showSuccessBar(resp.body.message);
          this.activeStep = 1;
        } else {
          this.modelService.showErrorBar(resp.body.message);
        }
      }, errorResp =>{
        this.modelService.loading = false;
        this.modelService.showErrorBar(errorResp.error.error)
      });
    }
  }

  private validateData(): boolean {
    switch(this.activeStep){
      case 1:
        return this.validateUserData();
      case 2:
        return this.validateClinicData();
      case 3:
        return this.validatePasswords();
      default:
        return false;
      }
  }

  private validateUserData(): boolean {
    if (!Utils.isStringValid(this.user.firstName, 4, 15)) {
      this.errorMessage.push("First Name should be 4 to 15 charactor long.")
    }
    if (!Utils.isStringValid(this.user.lastName, 4, 15)) {
      this.errorMessage.push("Last Name should be 4 to 15 charactor long.")
    }
    if (!Utils.isEmailIdValid(this.user.email)) {
      this.errorMessage.push("Please enter valid email Id.")
    }
    if (!Utils.isMobileNoValid(this.user.mobileNo)) {
      this.errorMessage.push("Please enter valid Mobile No. with length 10 digits.")
    }
    return this.errorMessage.length == 0;
  }

  private validateClinicData(): boolean {
    if (!Utils.isStringValid(this.user.clinic.clinicName, 4, 30)) {
      this.errorMessage.push("Hospital Name should be 4 to 30 charactor long.")
    }
    if (!Utils.isMobileNoValid(this.user.clinic.contactNo)) {
      this.errorMessage.push("Please enter valid Contact No. with length 10 digits.")
    }
    return this.errorMessage.length == 0;
  }

  private validatePasswords(): boolean {
    if (!Utils.isStringValid(this.user.password, 8, 30)) {
      this.errorMessage.push("Password be 8 to 30 charactor long.")
    }
    if (this.user.password != this.tempPass) {
      this.errorMessage.push("Password not matching.")
    }
    return this.errorMessage.length == 0;
  }

}
