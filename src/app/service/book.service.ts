import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Book } from '../level/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiURL: string = environment.apiURLBase + '/api/book';
  apiURLAdmin: string = environment.apiURLBase + '/api/admin/book';

  constructor(private http: HttpClient) { }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiURL}/${id}`);
  }

  getBookByLevelId(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiURL+"/find-by-level"}/${id}`);
  }

  save(book: Book) {
    return this.http.post<void>(`${this.apiURLAdmin}`,book);
  }

  update(book: Book) {
    return this.http.put<void>(`${this.apiURLAdmin}`,book);
  }
}
