import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from './student/student';
import { StudentPage } from './student/studentPage';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiURL: string = environment.apiURLBase + '/api/usuarios';

  constructor(private http: HttpClient) { }

  getClientes() : Observable<Student[]> {
    return this.http.get<Student[]>(this.apiURL);
  }

  list(page, size) : Observable<StudentPage> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(`${this.apiURL+"/obter-alunos"}?${params.toString()}`);
  }
}
