import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExtraFields, IpdHistoryModel, PatientModel } from 'src/app/dtos/patient.dto';
import { IpdService } from 'src/app/services/ipd.service';
import { ModelService } from 'src/app/services/model.service';
import { PatientService } from 'src/app/services/patient.service';
import { PrefrencesService } from 'src/app/services/prefrences.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-ipd-form',
  templateUrl: './ipd-form.component.html',
  styleUrls: ['./ipd-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IpdFormComponent  implements OnInit {

  public patientId: number;
  public patient: PatientModel;
  public ipd: IpdHistoryModel;
  public extraFields: ExtraFields[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private modalService: ModelService,
    private _location: Location,
    private prefrences: PrefrencesService,
    private ipdService: IpdService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((paramas) => {
      this.patientId = paramas['patientId'];
      this.getPatientDetails();
    });
    this.extraFields = this.prefrences.historyExtras ? JSON.parse(JSON.stringify(this.prefrences.ipdExtra)) : [];
    this.clearForm();
  }

  public getPatientDetails(): void {
    this.modalService.loading = true;
    this.patientService.getPatientById(this.patientId).subscribe((data) => {
      this.patient = data.body.result;
      this.modalService.loading = false;
    });
  }

  public goBack(): void {
    this._location.back();
  }

  public addIpdRound(): void {
    if(!Utils.isStringValid(this.ipd.observations, 3)){
      this.modalService.showErrorBar("Enter atleast 3 charactors in Observations");
      return;
    }

    if(!Utils.isStringValid(this.ipd.treatment, 3)){
      this.modalService.showErrorBar("Enter atleast 3 charactors in Treatment");
      return;
    }
    this.ipd.patientId = this.patient.id;
    this.setExtraFields();
    this.modalService.loading = true;
    this.ipdService.addIpdHistory(this.ipd).subscribe(resp => {
      this.modalService.loading = false;
      if(resp.body.code == "SUCCESS") {
        this.modalService.showSuccessBar(resp.body.message);
        this.router.navigate(['app/patient/' + this.patient.id + '/ipd/' + this.patient.ipd.id], {
          replaceUrl: true,
        });
      } else {
        this.modalService.showErrorBar(resp.body.message);
      }
    })
  }

  public setExtraFields(): void {
    this.ipd.extraFields = this.extraFields.filter((field: ExtraFields) =>
      Utils.isStringValid(field.fieldValue, 1)
    );
  }

  public clearForm(): void {
    this.ipd = new IpdHistoryModel();
    this.ipd.patientId = this.patientId;
  }

}
