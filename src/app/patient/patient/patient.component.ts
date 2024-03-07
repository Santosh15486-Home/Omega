import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PatientModel } from 'src/app/dtos/patient.dto';
import { ModelService } from 'src/app/services/model.service';
import { PatientService } from 'src/app/services/patient.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PatientComponent implements OnInit {
  public patientList: PatientModel[] = [];
  public pageNo = 0;
  public searchPatientData: PatientModel;
  public pageLabel = '';
  public isFilterAdded = false;
  public isFilterModalOpen = false;

  public isNewPatientModalOpen = false;
  public patientFormTitle = '';
  public patientForForm: PatientModel;
  constructor(
    private patientService: PatientService,
    private modelService: ModelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchPatientData = new PatientModel();
  }

  ionViewWillEnter(): void {
    this.getPatientList();
  }

  public getPatientList(): void {
    this.modelService.loading = true;
    this.patientService
      .getPatientList(this.pageNo, this.searchPatientData)
      .subscribe((resp) => {
        this.modelService.loading = false;
        this.patientList = resp.body;
        let start = this.pageNo * 20;
        this.pageLabel = 'Page : ' + (this.pageNo + 1);
        if (this.patientList.length > 0)
          this.pageLabel = this.pageLabel +  ' (' + (start + 1) + ' - ' + (start + this.patientList.length) + ')';
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

  public toggleNewPatientModel(
    forEdit = true,
    patinet = new PatientModel()
  ): void {
    if (forEdit) {
      this.patientFormTitle = 'Edit patinet info';
      this.patientForForm = patinet ? patinet : new PatientModel();
    } else {
      this.patientFormTitle = 'Create new patinet';
      this.patientForForm = new PatientModel();
    }
    this.isNewPatientModalOpen = !this.isNewPatientModalOpen;
  }

  public filterPatient(): void {
    this.isFilterAdded = true;
    this.pageNo = 0;
    this.toggleFilterModel();
    this.getPatientList();
  }

  public clearFilter(hideModal = true): void {
    if (hideModal) {
      this.toggleFilterModel();
    }
    this.isFilterAdded = false;
    this.pageNo = 0;
    this.searchPatientData = new PatientModel();
    this.getPatientList();
  }

  public showHistotyl(patient: PatientModel): void {
    this.router.navigate(['app/patient/' + patient.id + '/history']);
  }

  public showPatinetDetail(patient: PatientModel): void {
    this.router.navigate(['app/patient/' + patient.id]);
  }

  public addHistory(patient: PatientModel): void {
    if (patient.status == 'ADMITTED') {
      this.modelService.showErrorBar('Patient in IPD, can not add history');
      return;
    }
    this.router.navigate(['app/patient/' + patient.id + '/history/add']);
  }

  public savePatient(): void {
    if (!Utils.isStringValid(this.patientForForm.firstName, 4)) {
      this.modelService.showErrorBar(
        'Firstname is mandetory and min 4 length.'
      );
      return;
    }

    if (!Utils.isStringValid(this.patientForForm.lastName, 4)) {
      this.modelService.showErrorBar('Lastname is mandetory and min 4 length.');
      return;
    }

    if (!Utils.isStringValid(this.patientForForm.gender)) {
      this.modelService.showErrorBar('Gender is mandetory');
      return;
    }
    this.modelService.loading = true;
    this.patientService.savePatinet(this.patientForForm).subscribe((data) => {
      this.modelService.loading = false;
      if (!this.patientForForm.id) {
        this.pageNo = 0;
        this.searchPatientData = new PatientModel();
        this.getPatientList();
      }
      this.toggleNewPatientModel();
    });
  }
}
