import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExtraFields } from 'src/app/dtos/patient.dto';
import { ModelService } from 'src/app/services/model.service';
import { PrefrencesService } from 'src/app/services/prefrences.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-manage-extra-fields',
  templateUrl: './manage-extra-fields.component.html',
  styleUrls: ['./manage-extra-fields.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ManageExtraFieldsComponent  implements OnInit {

  public title = "";
  public type : string;
  public extraFields: ExtraFields[] = [];
  public newExtra: ExtraFields;
  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private prefrences: PrefrencesService,
    private modelService: ModelService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((paramas) => {
      this.type = paramas['type'];
    });
    this.newExtra = new ExtraFields();
    this.managePage();
  }

  public managePage(): void {
    switch(this.type) {
      case 'HISTORY_PREF':
        this.title = "History extra fields";
        this.extraFields = this.prefrences.historyExtras ? this.prefrences.historyExtras : [];
        break;
      case 'IPD_PREFRENCES':
        this.title = "IPD round extra fields";
        this.extraFields = this.prefrences.ipdExtra ? this.prefrences.ipdExtra : [];
        break;
    }
  }

  public addNewExtra(): void {
    if (this.newExtra.fieldName == "") {
      this.modelService.showErrorBar("Add Field Name");
      return;
    }

    if (this.alreadyExists()) {
      this.modelService.showErrorBar("Field Name already Exists");
      return;
    }
    this.newExtra.fieldName = Utils.toCamelCase(this.newExtra.fieldName);
    this.newExtra.id = this.extraFields.length + 1;
    this.extraFields.push(this.newExtra);
    this.newExtra = new ExtraFields();
  }

  public moveUp(field: ExtraFields): void {
    if (field.id == 1) {
      return;
    }
    let temp = new ExtraFields();

    temp.fieldName = this.extraFields[field.id - 1].fieldName;
    temp.fieldType = this.extraFields[field.id - 1].fieldType;

    this.extraFields[field.id - 1].fieldType = this.extraFields[field.id - 2].fieldType;
    this.extraFields[field.id - 1].fieldName = this.extraFields[field.id - 2].fieldName;

    this.extraFields[field.id - 2].fieldType = temp.fieldType;
    this.extraFields[field.id - 2].fieldName = temp.fieldName;
  }

  public moveDown(field: ExtraFields): void {
    if (field.id == this.extraFields.length) {
      return;
    }
    let temp = new ExtraFields();

    temp.fieldName = this.extraFields[field.id - 1].fieldName;
    temp.fieldType = this.extraFields[field.id - 1].fieldType;

    this.extraFields[field.id - 1].fieldType = this.extraFields[field.id].fieldType;
    this.extraFields[field.id - 1].fieldName = this.extraFields[field.id].fieldName;

    this.extraFields[field.id].fieldType = temp.fieldType;
    this.extraFields[field.id].fieldName = temp.fieldName;
  }

  public deletField(field: ExtraFields): void {
    this.extraFields.splice(field.id -1, 1);
    let index= 1;
    this.extraFields.forEach(field => {
      field.id = index;
      index ++;
    });
  }

  public saveExtraFields(): void {
    this.modelService.loading = true;
    this.prefrences.addFormExtras(this.extraFields, this.type).subscribe(data => {
      this.modelService.loading = false;
      this.modelService.showSuccessBar(this.title + " saved successfully.");
    });
  }
  private alreadyExists(): boolean {
    const exists = this.extraFields.filter((field: ExtraFields) => field.fieldName.toLocaleLowerCase() == this.newExtra.fieldName.toLocaleLowerCase());
    return exists.length > 0;
  }

  public goBack(): void {
    this._location.back();
  }

}
