import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutoLoginData, LoginModel } from 'src/app/dtos/patient.dto';
import { Apis } from 'src/app/services/apis';
import { ModelService } from 'src/app/services/model.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginComponent implements OnInit {
  public user: LoginModel;
  public showPassword = false;
  public autoLogin = false;
  private apis = new Apis();
  constructor(
    private userService: UserService,
    public modelService: ModelService
  ) {}

  ngOnInit() {
    this.clearForm();
  }

  ionViewWillEnter() {
    let data: AutoLoginData = this.apis.getAutoLoginData();
    console.log(data);
    if (data.canAutoLogin) {
      this.user = data.loginData;
      this.userLogin(true);
    }
  }

  public userLogin(autoLogin: boolean): void {
    if (this.user.userName.trim() == '' || this.user.password.trim() == '') {
      this.modelService.showErrorBar('Mobile no and password is mandetory');
      return;
    }
    this.userService.login(this.user, autoLogin);
  }

  public clearForm(): void {
    this.user = new LoginModel('', '');
  }

  public autoLooginToggle(): void {
    if (!this.autoLogin) {
      this.apis.clearAutoLoginData();
    }
  }
}
