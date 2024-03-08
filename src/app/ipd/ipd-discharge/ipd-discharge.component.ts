import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DischargeModel, PatientModel } from 'src/app/dtos/patient.dto';
import { IpdService } from 'src/app/services/ipd.service';
import { ModelService } from 'src/app/services/model.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-ipd-discharge',
  templateUrl: './ipd-discharge.component.html',
  styleUrls: ['./ipd-discharge.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IpdDischargeComponent  implements OnInit {

  public patientId: number;
  public patient: PatientModel;
  public discharge: DischargeModel;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModelService,
    private patientService: PatientService,
    private ipdService: IpdService,
    private _location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((paramas) => {
      this.patientId = paramas['patientId'];
      this.getPatientDetails();
    });
    this.clearForm();
  }

  public clearForm(): void {
    this.discharge = new DischargeModel();
    this.discharge.patinetId = this.patientId;
  }

  public goBack(): void {
    this._location.back();
  }

  public getPatientDetails(): void {
    this.modalService.loading = true;
    this.patientService.getPatientById(this.patientId).subscribe((data) => {
      this.patient = data.body.result;
      this.modalService.loading = false;
    });
  }

  public changePaidOrNot(): void {
    if(this.discharge.feesPaid) {
      this.discharge.amountPaid = this.discharge.fees;
    } else {
      this.discharge.amountPaid = 0;
    }
  }

  public resetForm(): void {
    this.discharge = new DischargeModel();
  }

  public dischargePatient(): void {
    this.discharge.patinetId = this.patient.id;
    this.discharge.ipdId = this.patient.ipd.id;
    if(!this.discharge.fees) {
      this.discharge.fees = 0;
    }

    if(!this.discharge.amountPaid) {
      this.discharge.amountPaid = 0;
    }
    this.modalService.loading = true;
    this.ipdService.dischargePatient(this.discharge).subscribe(resp =>{
      this.modalService.loading = false;
      if(resp.body.code == "SUCCESS") {
        this.modalService.showSuccessBar(resp.body.message);
        this.goBack();
      } else {
        this.modalService.showErrorBar(resp.body.message);
      }
    });
  }

  public onFeeChange(): void {
    if (this.discharge.feesPaid) {
      this.discharge.amountPaid = this.discharge.fees;
    } else {
      this.discharge.amountPaid = 0;
    }
  }

  public onFeePaidChange(): void {
    this.discharge.amountPaid = 0;
  }

}
