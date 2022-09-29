import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from './book/book';
import { BookPage } from './book/bookPage';

@Injectable({
  providedIn: 'root'
})
export class AdminBookService {

  apiURL: string = environment.apiURLBase + '/api/admin/book';

  constructor(private http: HttpClient) { }

  list(page, size, id) : Observable<BookPage> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(`${this.apiURL+"/obter-modulo-por-idioma"}/${id}?${params.toString()}`);
  }



  delete(book: Book) {
    return this.http.delete<any>(`${this.apiURL}/${book.id}`);
  }
}
