import { environment } from './../../environments/environment';
import { TestsList } from './../models/tests-list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  private readonly API = `${environment.API}tests`;

  constructor(
    private http: HttpClient
  ) { }

  getTests() {
    return this.http.get<TestsList[]>(this.API);
  }

  createTest(test: any) {
    return this.http.post(this.API, test);
  }

  updateTest(id: number, test: any) {
    return this.http.put(`${this.API}/${id}`, test);
  }

  deleteTest(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
