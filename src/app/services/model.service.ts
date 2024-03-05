import { ComponentRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackBar } from '../dtos/patient.dto';
@Injectable({
  providedIn: 'root',
})
export class ModelService {
  public loading: boolean = false;
  public showToast = false;
  public toastMessage = '';
  public toastClass = "";
  constructor() {}

  public showSuccessBar(message: string): void {
    this.showToastMessage(message, 'toast-success');
  }

  public showErrorBar(message: string): void {
    this.showToastMessage(message, 'toast-error');
  }

  public showToastMessage(message: string, toastClass = ""): void {
    this.showToast = true;
    this.toastMessage = message;
    this.toastClass = toastClass;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
