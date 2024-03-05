import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientModel } from 'src/app/dtos/patient.dto';
import { PatientService } from 'src/app/services/patient.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PatientComponent implements OnInit {

  public patientList: PatientModel[];
  public pageNo = 0;
  public searchPatientData: PatientModel;
  public pageLabel = "";
  public isFilterModalOpen = false;
  constructor(
    private patientService: PatientService
  ) { }

  ngOnInit() {
    this.searchPatientData = new PatientModel();
    this.getPatientList();
  }

  public getPatientList(): void {
    this.patientService
      .getPatientList(this.pageNo, this.searchPatientData)
      .subscribe((resp) => {
        this.patientList = resp.body;
        let start = (this.pageNo * 20);
        this.pageLabel = "Page : " + (this.pageNo + 1) + " (" + (start + 1) + " - " + (start + this.patientList.length) + ")";
        Utils.calculateAge(this.patientList);
      });
  }

  public nextPage(): void {

    this.pageNo = this.pageNo + 1;
    this.getPatientList();
  }

  public prevPage(): void {
    if (this.pageNo == 0) {
      return;
    }
    this.pageNo = this.pageNo - 1;
    this.getPatientList();
  }

  public toggleFilterModel(): void {
    this.isFilterModalOpen = !this.isFilterModalOpen;
  }

  public filterPatient(): void {
    this.pageNo = 0;
    this.toggleFilterModel();
    this.getPatientList();
  }

  public clearFilter(): void {
    this.pageNo = 0;
    this.toggleFilterModel();
    this.searchPatientData = new PatientModel();
    this.getPatientList();
  }

}
