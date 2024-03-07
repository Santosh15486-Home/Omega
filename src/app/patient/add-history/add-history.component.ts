import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExtraFields, HistoryModel, PatientModel } from 'src/app/dtos/patient.dto';
import { ModelService } from 'src/app/services/model.service';
import { PatientService } from 'src/app/services/patient.service';
import { PrefrencesService } from 'src/app/services/prefrences.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-add-history',
  templateUrl: './add-history.component.html',
  styleUrls: ['./add-history.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AddHistoryComponent implements OnInit {
  public patientId: number;
  public patient: PatientModel;
  public extraFields: ExtraFields[] = [];
  public history: HistoryModel;
  public complaintChips: ExtraFields[] = [];
  public treatChips: ExtraFields[] = [];
  public investChips: ExtraFields[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private modalService: ModelService,
    private prefrences: PrefrencesService,
    private _location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.extraFields = this.prefrences.historyExtras
      ? JSON.parse(JSON.stringify(this.prefrences.historyExtras))
      : [];
    this.complaintChips = this.prefrences.compTags;
    this.treatChips = this.prefrences.treatTags;
    this.investChips = this.prefrences.invTags;
    this.route.params.subscribe((paramas) => {
      this.patientId = paramas['patientId'];
      this.getPatientDetails();
    });
    this.clearForm();
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

  public addHistory(): void {
    if (!this.isDataValid()) {
      this.modalService.showErrorBar('Noting to save.');
      return;
    }
    this.modalService.loading = true;
    this.setExtraFields();
    this.patientService
      .saveHistory(this.history, this.patient.id)
      .subscribe((data) => {
        this.modalService.loading = false;
        this.modalService.showSuccessBar(
          'Patient visit data saved successfully.'
        );
        this.router.navigate(['app/patient/' + this.patient.id + '/history'], {
          replaceUrl: true,
        });
      });
  }

  public setExtraFields(): void {
    this.history.extraFields = this.extraFields.filter((field: ExtraFields) =>
      Utils.isStringValid(field.fieldValue, 1)
    );
  }

  public clearForm(): void {
    this.history = new HistoryModel();
    this.extraFields.forEach((ef) => (ef.fieldValue = ''));
  }

  public onFeeChange(): void {
    if (this.history.feesPaid) {
      this.history.amountPaid = this.history.fees;
    } else {
      this.history.amountPaid = 0;
    }
  }

  public onFeePaidChange(): void {
    this.history.amountPaid = 0;
  }

  public addTreatment(chip: ExtraFields): void {
    this.history.treatment = this.history.treatment + ' ' + chip.fieldName;
  }

  public addComplaint(chip: ExtraFields): void {
    this.history.complaints = this.history.complaints + ' ' + chip.fieldName;
  }

  public addInvestigation(chip: ExtraFields): void {
    this.history.investigation = this.history.investigation + ' ' + chip.fieldName;
  }

  private isDataValid(): boolean {
    return (
      this.history.complaints != '' ||
      this.history.investigation != '' ||
      this.history.treatment != ''
    );
  }
}
