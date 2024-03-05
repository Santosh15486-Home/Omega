import { Injectable } from '@angular/core';
import { Request, SmartService } from './smart.service';
import { Apis } from './apis'
import { Subject } from 'rxjs';
import { MenuItem } from '../dtos/patient.dto';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public menus: MenuItem[];
  drawerObserver: Subject<any> = new Subject();
  constructor(
    private smartService: SmartService
  ) { 
  }

  public getLeftPanelMenus(activePage = ""): void {
   this.smartService.get(new Request(new Apis().MENU_ITEMS)).subscribe(data => {
    this.menus = data.body;
    if(activePage != "") {
      this.setActivePage(activePage);
    }
   });
  }

  public noActiveMenu(): void {
    this.menus.forEach(m => m.active = false);
  }

  public toggleLeftMenus(): void {
    this.drawerObserver.next("");
  }

  private setActivePage(activePage: string): void {
    this.menus.forEach(m => {
      if(m.path == activePage) {
        m.active = true;
      }
    });
  }
}
