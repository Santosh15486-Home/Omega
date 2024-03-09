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
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ManageTagsComponent  implements OnInit {
  public newExtra: ExtraFields;
  public extraFields: ExtraFields[];
  public title = "";
  public type : string;
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
      case 'COMP_TAGS_PREF':
        this.title = "Complaint Tags";
        this.extraFields = this.prefrences.compTags ? this.prefrences.compTags : [];
        break;
      case 'INV_TAGS_PREF':
        this.title = "Investigation Tags";
        this.extraFields = this.prefrences.invTags ? this.prefrences.invTags : [];
        break;
      case 'TREAT_TAGS_PREF':
        this.title = "Treatment Tags";
        this.extraFields = this.prefrences.treatTags ? this.prefrences.treatTags : [];
        break;
    }
  }

  public addNewTag(): void {
    if (this.newExtra.fieldName == "") {
      this.modelService.showErrorBar("Add Tag Name");
      return;
    }

    if (this.alreadyExists()) {
      this.modelService.showErrorBar("Tag already Exists");
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
    this.prefrences.addTagsExtras(this.extraFields, this.type).subscribe(data => {
      this.modelService.loading = false;
      this.modelService.showSuccessBar(this.title + " saved successfully.");
    })
  }
  private alreadyExists(): boolean {
    const exists = this.extraFields.filter((field: ExtraFields) => field.fieldName.toLocaleLowerCase() == this.newExtra.fieldName.toLocaleLowerCase());
    return exists.length > 0;
  }

  
  public goBack(): void {
    this._location.back();
  }


}
