import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { DisciplineComponent } from './components/disciplines/discipline/discipline.component';
import { HomeComponent } from './components/home/home.component';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { TestsComponent } from './components/tests/tests.component';
import { SchoolReportComponent } from './components/school-report/school-report.component';
import { TitleBarComponent } from './shared/title-bar/title-bar.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ActivityComponent } from './components/activities/activity/activity.component';
import { TestComponent } from './components/tests/test/test.component';
import { TeacherComponent } from './components/teachers/teacher/teacher.component';
import { ReportComponent } from './components/school-report/report/report.component';
import { ReversePipe } from './shared/pipes/reverse.pipe';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleSingleComponent } from './components/schedule/schedule-single/schedule-single.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisciplinesComponent,
    TeachersComponent,
    ActivitiesComponent,
    TestsComponent,
    SchoolReportComponent,
    TitleBarComponent,
    DisciplineComponent,
    ConfirmationDialogComponent,
    ActivityComponent,
    TestComponent,
    TeacherComponent,
    ReportComponent,
    ReversePipe,
    ScheduleComponent,
    ScheduleSingleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
