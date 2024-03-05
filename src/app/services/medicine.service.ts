import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from './apis';
import { Request, SmartService } from './smart.service';
import { MedicineModel, MedicineTypeModel } from '../dtos/patient.dto';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private apis = new Apis();
  public medTypes: MedicineTypeModel[];
  public medicines: MedicineModel[];

  constructor(
    private smartService: SmartService
  ) { }

  public getMedicineTypes(): Observable<any> {
    return this.smartService.get(new Request(this.apis.MED_TYPE));
  }

  public loadMedTypes() {
    this.getMedicineTypes().subscribe(data => {
      this.medTypes = data.body;
      this.loadMedicines();
    });
  }

  public loadMedicines(): void {
    this.getAllMedicine().subscribe(data =>{
      this.medicines = data.body;
    });
  }

  public getMedicine(medicine: MedicineModel, pageNo?: number): Observable<any> {
    return this.smartService.post(new Request(this.apis.MEDS + "/search/" + pageNo,
      { 'name': medicine.medicineName, 'typeId': medicine.medicineType?.id }));
  }

  public getAllMedicine(): Observable<any> {
    return this.smartService.get(new Request(this.apis.MEDS + "/all"));
  }

  public saveMedicine(medicine: MedicineModel): Observable<any> {
    return this.smartService.post(new Request(this.apis.MEDS + "/add", medicine));
  }

  public deleteMedicine(medId: number): Observable<any> {
    return this.smartService.delete(new Request(this.apis.MEDS + "/delete/" + medId));
  }

  public editMedicine(med: MedicineModel): Observable<any> {
    return this.smartService.put(new Request(this.apis.MEDS + "/edit", med));
  }
}
