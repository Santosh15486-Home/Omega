import { Injectable } from '@angular/core';
import { Apis } from './apis';
import { Observable, Subject } from 'rxjs';
import { Request, SmartService } from './smart.service';
import { Router } from '@angular/router';
import { ModelService } from './model.service';
import { LoginModel, UserModel } from '../dtos/patient.dto';
import { CoreService } from './core.service';
import { PrefrencesService } from './prefrences.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: any;
  public apis = new Apis();
  userObserver: Subject<any> = new Subject<any>();

  constructor(
    private smartService: SmartService,
    private router: Router,
    private modelService: ModelService,
    private coreService: CoreService,
    private prefService: PrefrencesService
  ) { }

  public login(data: LoginModel) {
    this.modelService.loading = true;
    return this.smartService.login(new Request(this.apis.LOGIN, data)).subscribe({
      next: result => {
        this.modelService.loading = false;
        if (result.body.token) {
          this.apis.setUserId(result.body.user.user_id);
          this.apis.setAuthToken('Bearer ' + result.body.token);
          this.router.navigate(['dashboard']);
          this.getCurrentUser();
          this.coreService.getLeftPanelMenus();
          this.prefService.loadPrefrences();
        } else {
          this.modelService.showErrorBar(result.body.message);
        }
      }, error: error => {
        this.modelService.loading = false;
        this.modelService.showErrorBar("Invalid Username or password");
      }
    });
  }

  public createUser(user: UserModel): Observable<any> {
    return this.smartService.post(new Request(this.apis.USER, user));
  }

  public getCurrentUser() {
    this.smartService.get(new Request(this.apis.CURRENT_USER)).subscribe((res: any) => {
      this.user = res.body;
      this.checkAccountExpiry();
      this.userObserver.next(this.user);
      this.prefService.loadPrefrences();
      if (window.location.href.endsWith("/login")) {
        this.router.navigate(['dashboard']);
      }
    }, (error) => {
      this.modelService.loading = false;
      if (error.status == "403" || error.status == "401") {
        this.router.navigate(['login']);
      } 
      if (error.status == "0") {
        this.router.navigate(['login']);
      }
      this.router.navigate(['login']);
    });
  }

  public extendAcount(user: UserModel): Observable<any> {
    return this.smartService.post(new Request(this.apis.EXTEND_ACC, user));
  }
  public verifyAcount(user: UserModel): Observable<any> {
    return this.smartService.post(new Request(this.apis.VERIFY_ACC, user));
  }

  private checkAccountExpiry(): void {
    if(this.user.accountExpired) {
      this.user = null;
      this.router.navigate(['deactivated']);
    }
  }
}
