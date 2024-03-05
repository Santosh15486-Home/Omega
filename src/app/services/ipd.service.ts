import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from './apis';
import { Request, SmartService } from './smart.service';
import { DischargeModel, IpdHistoryModel } from '../dtos/patient.dto';

@Injectable({
  providedIn: 'root'
})
export class IpdService {

  public apis = new Apis;
  constructor(private smartService: SmartService) {

  }

  public addIpdHistory(ipd: IpdHistoryModel): Observable<any> {
    return this.smartService.post(new Request(this.apis.IPD + "/hostory", ipd));
  }

  public getIpdHistory(ipdId: number): Observable<any> {
    return this.smartService.get(new Request(this.apis.IPD + "/hostory/" + ipdId));
  }

  public dischargePatient(dischargeData: DischargeModel): Observable<any> {
    return this.smartService.post(new Request(this.apis.IPD+"/discharge", dischargeData));
  }
}
