import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from './apis';
import { Request, SmartService } from './smart.service';
import { HistoryModel, PatientModel } from '../dtos/patient.dto';

@Injectable({
  providedIn: "root",
})
export class PatientService {
  private apis = new Apis();

  constructor(private smartService: SmartService) { }

  public getPatientById(patientId: number): Observable<any> {
    return this.smartService.get(
      new Request(this.apis.PATIENTS + "/get/" + patientId)
    );
  }

  public getPatientList(
    pageNo: number,
    patient: PatientModel
  ): Observable<any> {
    return this.smartService.post(
      new Request(this.apis.PATIENTS + "/search/" + pageNo, patient)
    );
  }

  public savePatinet(patinet: PatientModel): Observable<any> {
    return this.smartService.post(new Request(this.apis.PATIENTS, patinet));
  }

  public saveHistory(
    history: HistoryModel,
    patientId: number
  ): Observable<any> {
    return this.smartService.post(
      new Request(this.apis.HISTORY + "/" + patientId, history)
    );
  }

  public getPatientHistory(patientId: number): Observable<any> {
    return this.smartService.get(
      new Request(this.apis.HISTORY + "/" + patientId)
    );
  }

  public getLastSpecified(limit: number): Observable<any> {
    return this.smartService.get(
      new Request(this.apis.PATIENTS + "/last/" + limit)
    );
  }

  public admitPatient(patient: PatientModel): Observable<any> {
    return this.smartService.post(new Request(this.apis.IPD + "/admit/" + patient.id));
  }

  public getAdmmitedPatients(): Observable<any> {
    return this.smartService.get(new Request(this.apis.IPD));
  }

  public getTransactionsForPatient(patientId: number): Observable<any> {
    return this.smartService.get(new Request(this.apis.TRANSACTION + "/get/" + patientId));
  }

  public markTransactionPaid(patientId: number, transactionId: number, amount: number): Observable<any> {
    return this.smartService.post(new Request(this.apis.TRANSACTION + "/pay/" + patientId + transactionId, { 'amount': amount, 'transactionId': transactionId }));
  }

  public deletePatient(id: number): Observable<any> {
    return this.smartService.delete(new Request(this.apis.PATIENTS + "/"+ id));
  }

}
