import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../level/book';
import { Level } from '../level/level';
import { LevelPage } from '../level/levelPage';

@Injectable({
  providedIn: 'root'
})
export class AdminLevelService {

  apiURL: string = environment.apiURLBase + '/api/admin/level';

  constructor(private http: HttpClient) { }

  delete(level: Level) {
    return this.http.delete<any>(`${this.apiURL}/${level.id}`);
  }

  salvar(book: Book) : Observable<Book>{
    return this.http.post<Book>(`${this.apiURL}`,book);
  }

  atualizar(book: Book) : Observable<any> {
    return this.http.put<Book>(`${this.apiURL}/${book.level.id}`,book);
  }
}
