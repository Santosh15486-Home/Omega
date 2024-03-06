import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CountModel, PatientModel } from 'src/app/dtos/patient.dto';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DashboardComponent {
  public patinets: PatientModel[] = [];
  public counts: CountModel[] = [];

  constructor(private patientService: PatientService, private router: Router) {}

  ionViewWillEnter() {
    this.loadData();
  }

  public loadData(): void {
    this.getCount();
    this.geSomeLastPatient();
  }

  public getCount(): void {
    this.patientService.getPatientCounts().subscribe((data) => {
      this.counts = data.body;
    });
  }

  public geSomeLastPatient(): void {
    this.patientService.getLastSpecified(10).subscribe((data) => {
      this.patinets = data.body;
    });
  }

  public showHistory(patient: PatientModel): void {
    this.router.navigate(['patient/' + patient.id + '/history']);
  }
}
