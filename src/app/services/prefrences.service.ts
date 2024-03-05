import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvanceExtraField, DefaultValues, ExtraFields } from '../dtos/patient.dto';
import { Apis } from './apis';
import { Request, SmartService } from './smart.service';
import { MedicineService } from './medicine.service';
@Injectable({
  providedIn: 'root'
})
export class PrefrencesService {

  static readonly HISTORY_PREF = 'HISTORY_PREF';
  static readonly COMP_TAGS_PREF = 'COMP_TAGS_PREF';
  static readonly INV_TAGS_PREF = 'INV_TAGS_PREF';
  static readonly IPD_PREFRENCES = 'IPD_PREFRENCES';
  static readonly TREAT_TAGS_PREF = 'TREAT_TAGS_PREF';
  static readonly DEFAULT_VALUES = 'DEFAULT_VALUES';

  public historyExtras: ExtraFields[];
  public ipdExtra: ExtraFields[];
  public compTags: ExtraFields[];
  public invTags: ExtraFields[];
  public treatTags: ExtraFields[];
  public defaultValues: AdvanceExtraField[];
  public presHeader: string;

  private apis = new Apis();

  constructor(
    private smartService: SmartService,
    private medicineService: MedicineService
  ) { }

  public loadPrefrences(): void {
    this.getHistoryFormExtras();
    this.getCompTagExtras();
    this.getInvTagExtras();
    this.getIpdFormExtras();
    this.getTreatMentTags();
    this.getDefaultValues();
    this.getPresHeader();
    this.medicineService.loadMedTypes();
  }

  private getPresHeader(): void {
    this.smartService.get(new Request(this.apis.PREFERENCES + "/header")).subscribe(data => {
      this.presHeader = data.body.headerText;
    });
  }

  private getHistoryFormExtras(): void {
    this.smartService.get(new Request(this.apis.PREFERENCES + "/" + PrefrencesService.HISTORY_PREF)).subscribe(data => {
      this.historyExtras = data.body;
    });
  }

  private getIpdFormExtras(): void {
    this.smartService.get(new Request(this.apis.PREFERENCES + "/" + PrefrencesService.IPD_PREFRENCES)).subscribe(data => {
      this.ipdExtra = data.body;
    });
  }

  private getCompTagExtras(): void {
    this.smartService.get(new Request(this.apis.PREFERENCES + "/" + PrefrencesService.COMP_TAGS_PREF)).subscribe(data => {
      this.compTags = data.body;
    });
  }

  private getInvTagExtras(): void {
    this.smartService.get(new Request(this.apis.PREFERENCES + "/" + PrefrencesService.INV_TAGS_PREF)).subscribe(data => {
      this.invTags = data.body;
    });
  }

  private getTreatMentTags(): void {
    this.smartService.get(new Request(this.apis.PREFERENCES + "/" + PrefrencesService.TREAT_TAGS_PREF)).subscribe(data => {
      this.treatTags = data.body;
    });
  }

  private getDefaultValues(): void {
    this.smartService.get(new Request(this.apis.PREFERENCES + "/" + PrefrencesService.DEFAULT_VALUES)).subscribe(data => {
      this.defaultValues = data.body;
    });
  }

  public addFormExtras(extraFields: ExtraFields[], prefrenceType: string): Observable<any> {
    let prefrences = new UserPrefrences();
    prefrences.preferenceType = prefrenceType;
    prefrences.extraFields = extraFields;
    return this.addExtras(prefrences);
  }

  public addTagsExtras(extraFields: ExtraFields[], prefrenceType: string): Observable<any> {
    let prefrences = new UserPrefrences();
    prefrences.preferenceType = prefrenceType;
    prefrences.extraFields = extraFields;
    return this.addExtras(prefrences);
  }

  public addDefaultValues(extraFields: AdvanceExtraField[], prefrenceType: string): Observable<any> {
    let prefrences = new AdvanceUserPrefrences();
    prefrences.preferenceType = prefrenceType;
    prefrences.extraFields = extraFields;
    return this.addExtras(prefrences);
  }

  public getDefaultValue(uuid: DefaultValues, defValue = ""): string {
    return this.defaultValues.find( f => f.uuid == uuid)?.fieldValue || defValue;
  }

  private addExtras(prefrences: UserPrefrences): Observable<any> {
    return this.smartService.post(new Request(this.apis.PREFERENCES, prefrences));
  }
}

export class UserPrefrences {
  public preferenceType: string;
  public extraFields: ExtraFields[];
}

export class AdvanceUserPrefrences {
  public preferenceType: string;
  public extraFields: AdvanceExtraField[];
}
