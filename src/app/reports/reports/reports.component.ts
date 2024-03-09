import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModelService } from 'src/app/services/model.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ReportsComponent {
  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  public years = [
    2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027,
    2028, 2029, 2030,
  ];

  public selectedMonth = new Date().getMonth();
  public selectedYear = new Date().getFullYear();
  public patCountLoaded = false;
  public feeLoaded = false;
  public reportData: ReportData[] = [];
  public patientTotal: number = 0;
  public feeTotal: number = 0;

  constructor(
    private modalService: ModelService,
    private patientService: PatientService
  ) {}

  ionViewWillEnter() {
    this.loadReport();
  }

  public loadReport(): void {
    this.patCountLoaded = false;
    this.feeLoaded = false;
    this.reportData = [];
    this.patientService
      .getSelectedMonthPatientReport(this.selectedMonth, this.selectedYear)
      .subscribe((data) => {
        this.patCountLoaded = true;
        this.processPatientData(data.body.data);
      });
  }

  private laodFeeReport(): void {
    this.patientService
      .getSelectedMonthFeeReport(this.selectedMonth, this.selectedYear)
      .subscribe((data) => {
        this.feeLoaded = true;
        this.processFeetData(data.body.data);
      });
  }

  private processPatientData(data: Data[]): void {
    this.patientTotal = 0;
    data.map((d) => {
      this.reportData.push(new ReportData(d.label, d.value));
      this.patientTotal = this.patientTotal + +d.value;
    });
    this.laodFeeReport();
  }

  private processFeetData(data: Data[]): void {
    this.feeTotal = 0;
    data.forEach((d) => {
      let obj = this.reportData.find(r => r.label == d.label);
        if(obj){
          obj.dayFee = d.value;
          this.feeTotal = this.feeTotal + +d.value;
        };
    });
  }
}

export class ReportData {
  constructor(_label: string, _patCount: number){
    this.label = _label;
    this.patCount = _patCount;
  }
  public label: string;
  public patCount: number;
  public dayFee: number;
}

export class Data {
  public label: string;
  public value: number;
}
