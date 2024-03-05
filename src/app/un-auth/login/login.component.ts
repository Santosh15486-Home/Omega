import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginModel } from 'src/app/dtos/patient.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginComponent  implements OnInit {

  public user: LoginModel;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.clearForm();
  }

  public userLogin(): void {
    this.userService.login(this.user);
  }

  public clearForm(): void {
    this.user = new LoginModel("", "");
  }

}
