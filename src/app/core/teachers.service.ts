import { environment } from './../../environments/environment';
import { TestsList } from './../models/tests-list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private readonly API = `${environment.API}teachers`;

  constructor(
    private http: HttpClient
  ) { }

  getTeachers() {
    return this.http.get<TestsList[]>(this.API);
  }

  createTeacher(teacher) {
    return this.http.post(this.API, teacher);
  }

  updateTeacher(id: number, teacher: any) {
    return this.http.put(`${this.API}/${id}`, teacher);
  }

  deleteTeacher(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
