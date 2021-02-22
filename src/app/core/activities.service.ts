import { environment } from './../../environments/environment';
import { ActivitiesList } from './../models/activities-list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private readonly API = `${environment.API}activities`;

  constructor(
    private http: HttpClient
  ) { }

  getActivities() {
    return this.http.get<ActivitiesList[]>(this.API);
  }

  createActivity(activity: any) {
    return this.http.post(this.API, activity);
  }

  updateActivity(id: number, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deleteActivity(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
