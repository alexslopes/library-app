import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './student/usuario';
import { StudentPage } from './student/studentPage';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiURL: string = environment.apiURLBase + '/api/usuarios';

  constructor(private http: HttpClient) { }

  salvar(student: Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(`${this.apiURL}`,student);
  }

  getClientes() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiURL);
  }

  list(page, size) : Observable<StudentPage> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(`${this.apiURL+"/obter-alunos"}?${params.toString()}`);
  }

  getStudentById(id: number) : Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiURL}/${id}`);
  }

  atualizar(student: Usuario) : Observable<any> {
    return this.http.put<Usuario>(`${this.apiURL}/${student.id}`,student);
  }

  delete(student: Usuario) {
    return this.http.delete<any>(`${this.apiURL}/${student.id}`);
  }


}
