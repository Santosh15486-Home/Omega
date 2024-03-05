import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginModel } from 'src/app/dtos/patient.dto';
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
  constructor(private userService: UserService, public modelService: ModelService) {}

  ngOnInit() {
    this.clearForm();
  }

  public userLogin(): void {
    if (this.user.userName.trim() == '' || this.user.password.trim() == '') {
      this.modelService.showErrorBar("Mobile no and password is mandetory")
      return;
    }
    this.userService.login(this.user);
  }

  public clearForm(): void {
    this.user = new LoginModel('', '');
  }
}
