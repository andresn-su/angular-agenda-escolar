import { ActivitiesService } from './../../core/activities.service';
import { TestsService } from './../../core/tests.service';
import { ScheduleService } from './../../core/schedule.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  titleToolbar = 'Início';
  days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  today = {
    today: undefined,
    tomorrow: undefined,
    qtdActivities: 0,
    qtdTests: 0,
    qtdTodayClasses: 0,
    disciplinesToday: [],
    disciplinesTomorrow: []
  };
  scheduleList$: Observable<any[]>;
  activitiesList$: Observable<any[]>;
  testsList$: Observable<any[]>;
  testsList: any = [];
  activitiesList: any = [];


  constructor(
    private schedules: ScheduleService,
    private tests: TestsService,
    private activities: ActivitiesService
  ) {
    this.getDay();
    this.scheduleList$ = this.schedules.getSchedule();
    this.activitiesList$ = this.activities.getActivities();
    this.testsList$ = this.tests.getTests();
    this.setDataDays();
    this.getQtdActivities();
    this.getQtdTests();
  }


  ngOnInit(): void {
  }


  getDay() {
    let today = new Date;
    this.today.today = this.days[today.getDay()];
    this.today.tomorrow = this.days[today.getDay()+1];
  }


  setDataDays() {
    this.scheduleList$.subscribe(data => {
      this.today.disciplinesToday = data.filter(day => day.day == this.today.today);
      this.today.disciplinesTomorrow = data.filter(day => day.day == this.today.tomorrow);
      
      this.today.qtdTodayClasses = this.today.disciplinesToday.length;
      this.today.qtdTests = this.today.disciplinesToday.length;
    });
  }


  getQtdActivities() {
    this.activitiesList$.subscribe(data => {
      this.activitiesList = data.filter(activity => activity.status == "Aguardando");
      this.today.qtdActivities = this.activitiesList.length;
    });
  }


  getQtdTests() {
    this.testsList$.subscribe(data => {
      this.today.qtdTests = data.length;
    });
  }
}
