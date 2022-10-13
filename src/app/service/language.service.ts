import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Language } from '../model/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  apiURL: string = environment.apiURLBase + '/api/language';

  constructor(private http: HttpClient) { }

  getAllLanguage() : Observable<Language[]> {
    return this.http.get<Language[]>(this.apiURL + "/obter-todos-idiomas");
  }

}
