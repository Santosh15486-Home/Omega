import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IpdHistoryModel, PatientModel } from 'src/app/dtos/patient.dto';
import { IpdService } from 'src/app/services/ipd.service';
import { ModelService } from 'src/app/services/model.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-ipd-history',
  templateUrl: './ipd-history.component.html',
  styleUrls: ['./ipd-history.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class IpdHistoryComponent  implements OnInit {
  public patientId: number;
  public ipdId: number;
  public patient: PatientModel;
  public ipdHistory: IpdHistoryModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private modalService: ModelService,
    private ipdService: IpdService,
    private _location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((paramas) => {
      this.patientId = paramas['patientId'];
      this.ipdId = paramas['ipdId'];
      this.getPatientDetails();
    });
  }

  public getPatientDetails(): void {
    this.modalService.loading = true;
    this.patientService.getPatientById(this.patientId).subscribe((data) => {
      this.patient = data.body.result;
      this.getPatientIpdHistory();
    });
  }

  public getPatientIpdHistory(): void {
    this.ipdService.getIpdHistory(this.ipdId).subscribe((data) => {
      this.ipdHistory = data.body;
      this.modalService.loading = false;
    });
  }

  public addIpdHistory(): void {
    this.router.navigate(['app/patient/' + this.patient.id + '/add/ipd']);
  }

  public goBack(): void {
    this._location.back();
  }
}
