import { Routes } from '@angular/router';
import { TabBarComponent } from './common/tab-bar/tab-bar.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PatientComponent } from './patient/patient/patient.component';
import { IpdComponent } from './ipd/ipd/ipd.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { LoginComponent } from './un-auth/login/login.component';
import { HistoryListComponent } from './patient/history-list/history-list.component';

export const routes: Routes = [
    {
      path: '',
      component: TabBarComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'dashboard',
        }, {
          path: 'dashboard',
          component: DashboardComponent
        }, {
          path: 'patients',
          component: PatientComponent
        }, {
          path: 'ipd',
          component: IpdComponent
        }, {
          path: 'reports',
          component: ReportsComponent
        }, {
          path: 'setting',
          component: SettingsComponent
        }, {
          path: 'patient/:patientId/history',
          component: HistoryListComponent
        }
      ]
    }, {
      path : 'login',
      component: LoginComponent
    }
];
