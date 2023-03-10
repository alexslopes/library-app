import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ChapterPageBook } from '../level/chapter-page-book';
import { PageBook } from '../level/page-book';
import { PageBookPages } from '../level/page-book-pages';

@Injectable({
  providedIn: 'root'
})
export class PageBookService {

  apiURL: string = environment.apiURLBase + '/api/page';
  apiURLAdmin: string = environment.apiURLBase + '/api/admin/page';

  constructor(private http: HttpClient) { }

  getPageBook(idBook: number, chapter: number, page, size) : Observable<ChapterPageBook> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(`${this.apiURL+"/obter-paginas-por-capitulo/" + idBook + "/" +chapter}?${params.toString()}`);
  }

  save(pageBook: PageBook) {
    return this.http.post<void>(`${this.apiURLAdmin}`,pageBook);
  }

  update(pageBook: PageBook) {
    return this.http.put<void>(`${this.apiURLAdmin}`,pageBook);
  }

  getPagesByChapter(idBook: number, chapter: number, page, size) : Observable<PageBookPages> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(`${this.apiURL+"/obter-paginas/" + idBook + "/" + chapter}?${params.toString()}`);
  }
}
