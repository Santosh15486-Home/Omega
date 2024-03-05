import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModelService } from 'src/app/services/model.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {

  constructor(private userService: UserService,
    public modelService: ModelService) { }

  ngOnInit() { 
    this.userService.getCurrentUser();
  }

}
