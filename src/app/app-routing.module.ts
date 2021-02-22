import { ScheduleSingleComponent } from './components/schedule/schedule-single/schedule-single.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ReportComponent } from './components/school-report/report/report.component';
import { TeacherComponent } from './components/teachers/teacher/teacher.component';
import { TestComponent } from './components/tests/test/test.component';
import { ActivityComponent } from './components/activities/activity/activity.component';
import { DisciplineComponent } from './components/disciplines/discipline/discipline.component';
import { SchoolReportComponent } from './components/school-report/school-report.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TestsComponent } from './components/tests/tests.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'disciplines', children: [
    {path: '', component: DisciplinesComponent},
    {path: ':id', component: DisciplineComponent},
    {path: 'add', component: DisciplineComponent}
  ]},
  {path: 'activities', children: [
    {path: '', component: ActivitiesComponent},
    {path: ':id', component: ActivityComponent},
    {path: 'add', component: ActivityComponent}
  ]},
  {path: 'tests', children: [
    {path: '', component: TestsComponent},
    {path: ':id', component: TestComponent},
    {path: 'add', component: TestComponent}
  ]},
  {path: 'teachers', children: [
    {path: '', component: TeachersComponent},
    {path: ':id', component: TeacherComponent},
    {path: 'add', component: TeacherComponent}
  ]},
  {path: 'school-report', children: [
    {path: '',  component: SchoolReportComponent},
    {path: ':id', component: ReportComponent},
    {path: 'add', component: ReportComponent}
  ]},
  {path: 'schedule', children: [
    {path: '',  component: ScheduleComponent},
    {path: ':id', component: ScheduleSingleComponent},
    {path: 'add', component: ScheduleSingleComponent}
  ]},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
