import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { MessageService } from './../../core/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleService } from './../../core/schedule.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  titleToolbar = 'Horário';
  scheduleList$: Observable<any[]>;
  message;
  days = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  }

  constructor(
    private schedules: ScheduleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.scheduleList$ = this.schedules.getSchedule();
    this.message = this.messageService.message;
    this.setDataDays();
  }


  setDataDays() {
    this.scheduleList$.subscribe(data => {
      this.days.monday = data.filter(day => day.day == "Segunda");
      this.days.tuesday = data.filter(day => day.day == "Terça");
      this.days.wednesday = data.filter(day => day.day == "Quarta");
      this.days.thursday = data.filter(day => day.day == "Quinta");
      this.days.friday = data.filter(day => day.day == "Sexta");
    });
  }
}
