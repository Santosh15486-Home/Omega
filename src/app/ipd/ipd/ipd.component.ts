import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PatientModel } from 'src/app/dtos/patient.dto';
import { ModelService } from 'src/app/services/model.service';
import { PatientService } from 'src/app/services/patient.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-ipd',
  templateUrl: './ipd.component.html',
  styleUrls: ['./ipd.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class IpdComponent  implements OnInit {

  public ipdPatients: PatientModel[] = [];

  constructor(
    private patientService: PatientService,
    private modelService: ModelService
    ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getIpd();
  }

  public getIpd(): void {
    this.modelService.loading = true;
    this.patientService.getAdmmitedPatients().subscribe((resp) => {
      this.modelService.loading = false;
      this.ipdPatients = resp.body;
      Utils.calculateAge(this.ipdPatients);
    });
  }

}
