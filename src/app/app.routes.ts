import { Routes } from '@angular/router';
import { TabBarComponent } from './common/tab-bar/tab-bar.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PatientComponent } from './patient/patient/patient.component';
import { IpdComponent } from './ipd/ipd/ipd.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { LoginComponent } from './un-auth/login/login.component';
import { HistoryListComponent } from './patient/history-list/history-list.component';
import { AddHistoryComponent } from './patient/add-history/add-history.component';
import { PatientDetailComponent } from './patient/patient-detail/patient-detail.component';
import { AccoutExpiredComponent } from './un-auth/accout-expired/accout-expired.component';
import { IpdHistoryComponent } from './ipd/ipd-history/ipd-history.component';
import { IpdFormComponent } from './ipd/ipd-form/ipd-form.component';
import { IpdDischargeComponent } from './ipd/ipd-discharge/ipd-discharge.component';

export const routes: Routes = [
  {
    path: 'app',
    component: TabBarComponent,
    children: [
      {
        path: 'app',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'patients',
        component: PatientComponent,
      },
      {
        path: 'ipd',
        component: IpdComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'setting',
        component: SettingsComponent,
      }, {
        path: 'patient/:patientId/history',
        component: HistoryListComponent,
      }, {
        path: 'patient/:patientId/history/add',
        component: AddHistoryComponent,
      }, {
        path: 'patient/:patientId',
        component: PatientDetailComponent,
      }, {
        path: 'patient/:patientId/ipd/:ipdId',
        component: IpdHistoryComponent
      }, {
        path: 'patient/:patientId/add/ipd',
        component: IpdFormComponent
      }, {
        path: 'patient/:patientId/discharge',
        component: IpdDischargeComponent
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'deactivated',
    component: AccoutExpiredComponent
  },
];
