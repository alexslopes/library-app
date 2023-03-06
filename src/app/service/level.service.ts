import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../level/book';
import { Level } from '../level/level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  apiURL: string = environment.apiURLBase + '/api/level';
  apiURLAdmin: string = environment.apiURLBase + '/api/admin/level';

  constructor(private http: HttpClient) { }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiURL}/${id}`);
  }

  public getLeveById(id: number): Observable<Level> {
    return this.http.get<Level>(`${this.apiURL}/${id}`);
  }

  updateLevel(level: Level) {
    return this.http.put<Level>(`${this.apiURLAdmin}`,level);
  }

  salvar(level: Level) : Observable<Level>{
    return this.http.post<Level>(`${this.apiURLAdmin}`,level);
  }
}
