import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SettingsComponent {
  public user: any;

  constructor(private userService: UserService) {}

  ionViewWillEnter() {
    this.user = this.userService.user;
  }

  public signOut(): void {
    sessionStorage.clear();
    window.location.reload();
  }
}
