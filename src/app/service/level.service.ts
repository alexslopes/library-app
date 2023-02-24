import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Level } from '../level/level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  apiURL: string = environment.apiURLBase + '/api/level';

  constructor(private http: HttpClient) { }

  getBookById(id: number): Observable<Level> {
    return this.http.get<Level>(`${this.apiURL}/${id}`);
  }
}
