import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisciplinesListItem } from '../models/disciplines-list-item';

@Injectable({
  providedIn: 'root'
})
export class DisciplinesService {
  private readonly API = `${environment.API}disciplines`;

  constructor(
    private http: HttpClient
  ) { }

  getDisciplines() {
    return this.http.get<DisciplinesListItem[]>(this.API);
  }

  createDisciplines(discipline: any) {
    return this.http.post(this.API, discipline);
  }

  updateDiscipline(id: number, discipline: any) {
    return this.http.put(`${this.API}/${id}`, discipline);
  }

  deleteDiscipline(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
  
}
