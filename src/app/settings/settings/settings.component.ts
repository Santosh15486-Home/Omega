import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public extraFiledsOptions = [
    { name : "History Extra Fileds" , type: "HISTORY_PREF" },
    { name : "IPD Round Extra Fields" , type: "IPD_PREFRENCES" }
  ];

  public tagsOptions = [
    { name : "Complaint Tags" , type: "COMP_TAGS_PREF" },
    { name : "Treatment Tags" , type: "TREAT_TAGS_PREF" },
    { name : "Investigation Tags" , type: "INV_TAGS_PREF" }
  ];

  constructor(
    private userService: UserService,
    private router: Router
    ) {}

  ionViewWillEnter() {
    this.user = this.userService.user;
  }

  public signOut(): void {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }

  public manageTags(type: string): void {
    this.router.navigate(['app/settings/tags/'+type]);
  }

  public manageExtraFileds(type: string): void {
    this.router.navigate(['app/settings/extrafields/'+type]);
  }
}
