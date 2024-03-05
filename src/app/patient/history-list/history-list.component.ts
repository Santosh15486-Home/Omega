import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HistoryModel, PatientModel } from 'src/app/dtos/patient.dto';
import { ModelService } from 'src/app/services/model.service';
import { PatientService } from 'src/app/services/patient.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HistoryListComponent implements OnInit {
  public patientId: number;
  public patient: PatientModel;
  public history: HistoryModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private modalService: ModelService,
    private _location: Location
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
      this.patient = data.body.result;
      this.getPatientHistory();
    });
  }

  public getPatientHistory(): void {
    this.patientService.getPatientHistory(this.patientId).subscribe((data) => {
      this.history = data.body;
      this.fortmatTreatment();
      this.modalService.loading = false;
    });
  }

  public goBack(): void {
    this._location.back();
  }

  private fortmatTreatment(): void {
    this.history.map((his) => {
      if(his.treatment) {
        his.treatment = his.treatment.replace(/&quot;/g, '"');
        if (his.treatment != '' && his.treatment.startsWith('[')) {
          his.treatType = 'PRINT';
          his.medicines = JSON.parse(his.treatment);
        } else {
          his.treatType = 'RAW';
        }
      }
    });
  }
}
