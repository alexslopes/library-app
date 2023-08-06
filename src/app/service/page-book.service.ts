import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ChapterPageBook } from '../level/chapter-page-book';
import { PageBook } from '../level/page-book';
import { PageBookPages } from '../level/page-book-pages';
import { Book } from '../level/book';

@Injectable({
  providedIn: 'root'
})
export class PageBookService {

  apiURL: string = environment.apiURLBase + '/api/page';
  apiURLAdmin: string = environment.apiURLBase + '/api/admin/page';

  constructor(private http: HttpClient) { }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiURL}/${id}`);
  }

  save(pageBook: PageBook) {
    return this.http.post<void>(`${this.apiURLAdmin}`,pageBook);
  }

  update(pageBook: PageBook) {
    return this.http.put<void>(`${this.apiURLAdmin}`,pageBook);
  }
}
