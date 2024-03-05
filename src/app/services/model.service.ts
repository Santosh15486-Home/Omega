import { ComponentRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackBar } from '../dtos/patient.dto';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private modalNotifier?: Subject<string>;
  public showDialog = false;
  public dialog: ComponentRef<any>;
  public loading: boolean = false;
  public showSanckBarFlag: boolean = false;
  public snackBar: SnackBar;
  public snackBarTimer: any;

  constructor() {}
  
  closeModal() {
    this.dialog.location.nativeElement.remove();
    this.modalNotifier?.complete();
  }

  submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }

  public closeModalForBackDrop(): void {
    this.showDialog = false;
    this.closeModal();
  }

  public showSuccessBar(message: string, icon?: string): void {
    this.showSnackBar(message, "snackbar-success", icon);
  }

  public showErrorBar(message: string, icon?: string): void {
    this.showSnackBar(message, "snackbar-error", icon);
  }

  private showSnackBar(message: string, classList?: string, icon?: string): void {
    this.showSanckBarFlag = true;
    this.snackBar = new SnackBar(message, classList, icon);
    this.snackBarTimer = setTimeout(()=>{
      this.showSanckBarFlag = false;
    }, 5000);
  }

  public hideSnackBar(): void {
    this.showSanckBarFlag = false;
    clearTimeout(this.snackBarTimer);
  }
}
