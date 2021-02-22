import { Schedules } from './../models/schedules';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private readonly API = `${environment.API}schedule`;

  constructor(
    private http: HttpClient
  ) { }

  getSchedule() {
    return this.http.get<Schedules[]>(this.API);
  }

  createSchedule(item) {
    return this.http.post(this.API, item);
  }

  updateSchedule(id: number, item: any) {
    return this.http.put(`${this.API}/${id}`, item);
  }

  deleteSchedule(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
