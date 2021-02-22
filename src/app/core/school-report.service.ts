import { environment } from './../../environments/environment';
import { ReportsList } from './../models/reports-list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchoolReportService {
  private readonly API = `${environment.API}schoolReport`;

  constructor(
    private http: HttpClient
  ) { }

  getSchoolReport() {
    return this.http.get<ReportsList[]>(this.API);
  }

  createReport(report: any) {
    return this.http.post(this.API, report);
  }

  updateReport(id: number, report: any) {
    return this.http.put(`${this.API}/${id}`, report);
  }

  deleteReport(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
