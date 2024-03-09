import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PatientModel } from 'src/app/dtos/patient.dto';
import { IpdService } from 'src/app/services/ipd.service';
import { ModelService } from 'src/app/services/model.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PatientDetailComponent implements OnInit {
  public patientId: number;
  public patient: PatientModel;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private modalService: ModelService,
    private _location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((paramas) => {
      this.patientId = paramas['patientId'];
      this.getPatientDetails();
    });
  }

  public getPatientDetails(): void {
    this.modalService.loading = true;
    this.patientService.getPatientById(this.patientId).subscribe((data) => {
      this.modalService.loading = false;
      this.patient = data.body.result;
    });
  }

  public showHistory(): void {
    this.router.navigate(['app/patient/' + this.patient.id + '/history']);
  }

  public dischargePatient(): void {
    this.router.navigate(['app/patient/' + this.patient.id + '/discharge']);
  }

  public addIpdRound(): void {
    this.router.navigate(['app/patient/' + this.patient.id + '/add/ipd'])
  }

  public admitPatient(): void {
    this.modalService.loading = true;
    this.patientService.admitPatient(this.patient).subscribe((resp) => {
      this.modalService.loading = false;
      if (resp.body.code == "SUCCESS") {
        this.getPatientDetails();
        this.modalService.showSuccessBar(resp.body.message);
      } else {
        this.modalService.showErrorBar(resp.body.message);
      }
    });
  }

  public goBack(): void {
    this._location.back();
  }
}
