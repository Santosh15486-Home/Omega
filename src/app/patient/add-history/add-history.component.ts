import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddHistoryComponent  implements OnInit {

  public patientId: number;
  public patient: PatientModel;
  public extraFields: ExtraFields[] = [];
  public history: HistoryModel;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private modalService: ModelService,
    private prefrences: PrefrencesService,
    private _location: Location
  ) { }

  ngOnInit() {
    setTimeout(()=>{
      this.extraFields = this.prefrences.historyExtras ? 
      JSON.parse(JSON.stringify(this.prefrences.historyExtras)) : [];
    }, 2000)
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
      this.modalService.showErrorBar("Noting to save.")
      return;
    }
    this.modalService.loading = true;
    this.setExtraFields();
    this.patientService.saveHistory(this.history, this.patient.id).subscribe(data => {
      this.modalService.loading = false;
      this.modalService.showSuccessBar("Patient visit data saved successfully.");
    })
  }

  public setExtraFields(): void {
    this.history.extraFields = this.extraFields.filter((field: ExtraFields) => Utils.isStringValid(field.fieldValue, 1))
  }

  public clearForm(): void {
    this.history = new HistoryModel();
  }

  private isDataValid(): boolean {
    return (this.history.complaints != "" || this.history.investigation != "" || this.history.treatment != "");
  }

}
