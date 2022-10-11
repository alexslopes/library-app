import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../student/usuario';
import { StudentPage } from '../student/studentPage';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiURL: string = environment.apiURLBase + '/api/usuarios';

  constructor(private http: HttpClient) { }

  getClientes() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiURL);
  }

  getStudentById(id: number) : Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiURL}/${id}`);
  }


}
