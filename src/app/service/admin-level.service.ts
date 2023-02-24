import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Level } from '../level/level';
import { LevelPage } from '../level/levelPage';

@Injectable({
  providedIn: 'root'
})
export class AdminLevelService {

  apiURL: string = environment.apiURLBase + '/api/admin/level';

  constructor(private http: HttpClient) { }

  list(page, size, id) : Observable<LevelPage> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(`${this.apiURL+"/obter-modulo-por-idioma"}/${id}?${params.toString()}`);
  }

  delete(level: Level) {
    return this.http.delete<any>(`${this.apiURL}/${level.id}`);
  }

  salvar(level: Level) : Observable<Level>{
    return this.http.post<Level>(`${this.apiURL}`,level);
  }

  atualizar(level: Level) : Observable<any> {
    return this.http.put<Level>(`${this.apiURL}/${level.id}`,level);
  }
}
